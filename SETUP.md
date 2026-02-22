# 本地跑通闭环步骤

## 1) 安装依赖

```bash
npm install
```

## 2) 配置环境变量

复制 `.env.example` 为 `.env.local`，填写 Supabase 与 Stripe 的 key。

## 3) 执行 Supabase migration

方式 A（CLI）：

```bash
supabase db push
```

方式 B（SQL Editor）：执行 `supabase/migrations/202602220001_orders_workflow.sql`。

## 4) 启动 Next.js

```bash
npm run dev
```

## 5) 启动 Stripe webhook 转发

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

复制输出的 signing secret 到 `STRIPE_WEBHOOK_SECRET`。

## 6) 触发 checkout.session.completed

```bash
stripe trigger checkout.session.completed
```

验证：`orders` 写入一条 `paid` 订单，`order_events` 至少两条（created + paid）。

## 7) 客户端验证

1. 进入 `/order/track`，输入 `order_no + access_token`，可看到状态、事件、文件。
2. 进入 `/order/upload` 上传 pdf/jpg/png（<=10MB），成功后刷新 `/order/track` 可见新文件与事件。

## 8) 管理端验证

1. 访问 `/admin/orders`，浏览器会弹 Basic Auth。
2. 用户名固定 `admin`，密码为 `ADMIN_PASSWORD`。
3. 在详情页 `/admin/orders/:orderId` 更新状态并上传交付文件。
4. 刷新查看状态、事件、文件均更新。

## 关键设计选择

- **客户校验方式**：采用 `order_no + access_token`，避免邮箱拼写误差，且访问码随机不可预测。
- **订单号格式**：`EGS-YYYYMMDD-6位随机`，比 UUID 更便于用户输入与客服定位。
- **数据安全**：三张业务表均开启 RLS 且默认拒绝，所有读写经服务端 API（service role）执行，避免客户端越权。
- **存储规则**：统一 `order-uploads` bucket，路径按 `orders/{order_id}/{role}/...`，便于审计与隔离。
