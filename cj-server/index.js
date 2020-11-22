const express = require("express");
const formidable = require("formidable");
const XLSX = require("xlsx");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 4000;

app.post("/upload", (req, res) => {
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    console.info(JSON.stringify({ fields, files }));
    var workbook = XLSX.readFile(files.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    /* get the range */
    var range = XLSX.utils.decode_range(worksheet["!ref"]);
    /* skip n rows */
    range.s.r += 17;
    if (range.s.r >= range.e.r) range.s.r = range.e.r;
    /* update range */
    worksheet["!ref"] = XLSX.utils.encode_range(range);

    console.info(XLSX.utils.sheet_to_json(worksheet));
    console.info(workbook);
    res.json({ workbook: XLSX.utils.sheet_to_json(worksheet) });
  });
});
app.listen(port, () => console.info(`Listening on ${port}`));
