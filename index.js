const {app, BrowserWindow} = require('electron')
const path = require('path')
const fs = require('file-system')
const dialog = require('electron').dialog;
const clog = console.log;


 const generateFileTreeObject = dir2read => {
  return fs.readdirAsync(dir2read, function(err, flist){
   if (err) {
     //TODO handle the error
   }
   })
    .then(arrayOfFileNameStrings => {
      const fileDataPromises = arrayOfFileNameStrings.map(fileNameString => {
        const fullPath = `${dir2read}/${fileNameString}`;
        return fs.stat(fullPath)
          .then(fileData => {
            const file = {};
            file.filePath = fullPath;
            file.isFileBoolean = fileData.isFile();
            /*Here is where we'll do our recursive call*/
            if (!file.isFileBoolean) {
              return generateFileTreeObject(file.filePath)
                .then(fileNamesSubArray => {
                  file.files = fileNamesSubArray;
                })
                .catch(console.error);
            }
            /*End recursive condition*/
            return file;
          });
      });
      return Promise.all(fileDataPromises);
    });
};
