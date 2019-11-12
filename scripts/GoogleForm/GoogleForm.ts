var descripitonStandard : string = 'Thank you for participation. We hope you had as much fun attending as we did organizing it. We want to hear your feedback so we can keep improving our talks, events and workshop. Please fill this quick survey and let us know your thoughts.'
function doGet() {
    return ContentService
        .createTextOutput('ERROR - Please use the post request.')
}

function doPost(e) {
    var data = JSON.parse(e.postData.contents)
    var form = FormApp.create(data.title + ' - Feedback');
    form.setDescription(data.description || descripitonStandard)
    data.talks.forEach(talk => {
        form.addScaleItem()
               .setBounds(1, 5)
               .setTitle('How helpful was ' + talk.title + ' By ' + talk.speaker)
               .setLabels('Not very', 'Very much' )
    });
    form.addScaleItem()
        .setRequired(true)
        .setBounds(1, 5)
        .setTitle('How satisfied are you with the event?')
        .setLabels('Not very', 'Very much')
    form.addTextItem()
        .setTitle('What would you like to discuss in next roundtable discussion?')
    form.addTextItem()
        .setTitle('Tell us why (Additional feedback)')
    form.addTextItem()
        .setTitle('Stay connected with us?')
        .setHelpText('Enter your email to get updates on upcoming events like our monthly meetups, as well as to receive photographs from today')
    form.addMultipleChoiceItem()
        .setTitle('What best describes your role?')
        .setRequired(true)
        .setChoiceValues(['Software Engineer - Android', 'Software Engineer - Other', 'Data Scientist', 'Designer', 'Product Manager'])
        .showOtherOption(true);

    var result = {
        status: 'The Form Has Been Successfully Published',
        url: form.getPublishedUrl(),
        edit_url: form.getEditUrl()
    }

    Logger.log('Result : ' + result);
    return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}
