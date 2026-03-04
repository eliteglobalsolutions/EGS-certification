# samples_raw structure

Each sample must be stored as:

samples_raw/{country}/{slug}/
  source.pdf
  redaction.json
  metadata.json (optional)

redaction.json uses percentage coordinates:
{
  "pages": {
    "1": [{"x":0.1,"y":0.2,"w":0.3,"h":0.05}],
    "2": [],
    "3": []
  }
}
