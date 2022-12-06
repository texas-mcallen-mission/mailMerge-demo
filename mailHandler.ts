let emailSheetConfig:sheetDataEntry = {
    tabName: 'data',
    headerRow: 0,
    initialColumnOrder: {
        name: 0,
        email: 1,
        emailSent: 2,
        stat1: 3,
        stat2: 4,
        stat3: 5,
    },
    includeSoftcodedColumns: true
}

// WYLO: trying to figure out why emailSender() works but emailData winds up with no data after adding iterants


function emailSender_(dataEntry: {}) {
    let mailData: GoogleAppsScript.Mail.MailAdvancedParameters = {
        name: "Bert's Messaging Bot",
        subject:"Demo Email Thingy"
    };
    // list of available properties:
    //     attachments ?: Base.BlobSource[] | undefined;
    //     /** a comma-separated list of email addresses to BCC */
    //     bcc ?: string | undefined;
    //     /** the body of the email */
    //     body ?: string | undefined;
    //     /** a comma-separated list of email addresses to CC */
    //     cc ?: string | undefined;
    //     /** if set, devices capable of rendering HTML will use it instead of the required body argument; you can add an optional inlineImages field in HTML body if you have inlined images for your email */
    //     htmlBody ?: string | undefined;
    //     /** a JavaScript object containing a mapping from image key (String) to image data (BlobSource); this assumes that the htmlBody parameter is used and contains references to these images in the format <img src="cid:imageKey" /> */
    //     inlineImages ?: { [imageKey: string]: Base.BlobSource } | undefined;
    //     /** the name of the sender of the email (default: the user's name) */
    //     name ?: string | undefined;
    //     /** true if the email should be sent from a generic no-reply email address to discourage recipients from responding to emails; this option is only possible for G Suite accounts, not Gmail users */
    //     noReply ?: boolean | undefined;
    //     /** an email address to use as the default reply-to address (default: the user's email address) */
    //     replyTo ?: string | undefined;
    //     /** the subject of the email */
    //     subject ?: string | undefined;
    //     /** the address of the recipient */
    //     to ?: string | undefined;
    // 

    if (dataEntry.hasOwnProperty("email")) {
        mailData.to = dataEntry["email"];
    }
    let newline = "\n"
    let body = "Hello! " + dataEntry["name"] + newline + newline
        + "here's some demo numbers in case you want them:" + newline
    
    // the key here is the value of the desired column in the supplied sheetDataConfig
    // the value is the displayed value in the thing.
    // 
    let stats = {
        stat1: "Stat 1",
        stat2: "Stat 2",
        stat3: "Stat 3"
    }
    
    for (let key in stats) {
        if (dataEntry.hasOwnProperty(key)) {
            body += stats[key] + ": " + dataEntry[key] + newline
        }
    }
    mailData.body = body
    MailApp.sendEmail(mailData)

}

function mailhandlerDemo() {
    // set up sheetData, get thing configured
    let emailConfig = new RawSheetData(emailSheetConfig)
    let emailSheet = new SheetData(emailConfig)
    // load up data and stick it in a kiDataClass
    let emailData = new kiDataClass(emailSheet.getData())
    // add iterant so that we can do partial updates.  Might make this internal to the sheetData class in the future.
    let iterantKey = "iterantKey"
    emailData.addIterant(iterantKey, 0)
    // filter out entries that have already been emailed
    emailData.removeMatchingByKey("emailSent", [true])
    
    
    if (emailData.data.length = 0) {
        console.log("no new entries to email")
        return
    }
    let emailedEntries:number[] = []
    let emailOutData:any[] = []
    // okay, onto the big fun loop.
    for (let entry of emailData.end) {
        if (canEmail_()) { // this saves us from trying to email when we can't and keeps out errors
            emailSender_(entry)
            emailedEntries.push(entry[iterantKey])
            emailOutData.push({"emailSent":true})
        } else {
            break
        }
    }

    for (let i = 0; i < emailedEntries.length; i++){
        let entryPosition = emailedEntries[i] + 1
        let modData = emailOutData[i]
        emailSheet.directModify(entryPosition, modData)
    }
    

}


function canEmail_(): boolean{
    if (MailApp.getRemainingDailyQuota() > 15) {
        return true
    } else {
        return false
    }
}
