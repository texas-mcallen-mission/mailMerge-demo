# mailMerge-demo

This is a demonstration for how to use [sheetCore](https://github.com/texas-mcallen-mission/sheetCore) to make a mail-merge type application.

The create-the-email function should be fairly simple to use and modify.

## How to use this in your own project:

1. Fork this repo!
2. Create / open up a google Spreadsheet, and set up an AppsScript project for it. (Extensions / AppsScript)
3. Set up your CI secrets so that things automatically push [following this guide](https://github.com/texas-mcallen-mission/deploy-google-app-script-action-typescript/README.md)

Configure your column definitions to match ``emailSheetConfig.initialColumnOrder``
* note: column names do not have to be the same as the key, but make it reasonable.
* Also, if ``includeSoftcodedColumns`` is set to true, any columns with a header that aren't coded in will be included as long as they have unique names.

Once everything's setup properly, your CI run should look something like this:
![Successful CI Run](docs/successful%20CI%20run.png) 

The first time you run ``mailhandlerdemo()``, a new sheet will appear in your spreadsheet with the columns as you've defined them.  Feel free to populate that and test with whatever you'd like!