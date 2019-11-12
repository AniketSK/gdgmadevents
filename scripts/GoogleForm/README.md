Google Form Creation by using Google App Script and POST request.

# Deploy

    clasp deploy

# Required Parameters

***Json Object to be passed in the body of the post request***

    {
    "title": "GDG MAD Feb",
    "description": "A description",
    "talks": [
        {
            "title": "RxJava - Intro and Beyond",
            "speaker": "Jitesh"
        },
        {
            "title": "DApps - Intro and Beyond",
            "speaker": "Preet"
        },
        {
            "title": "Flutter - ...",
            "speaker": "XYZ!"
        }
    ]
    }

If the description is null a default description will be used :


    Thank you for participation. We hope you had as much fun attending as we did organizing it. We want to hear your feedback so we can keep improving our talks, events and workshop. Please fill this quick survey and let us know your thoughts.

      

***Response Sample***

    {
    "status": "The Form Has Been Successfully Published",
    "url": "https://docs.google.com/forms/d/e/1FAIpQLSfMb5uqzxOjrzacVlVJAUDX2I6HEZ-pE7BA6nKFc1viUd08OQ/viewform",
    "edit_url": "https://docs.google.com/forms/d/1B3zOLeQ2dRBJsNCtFYMy0YjriOR-lWJ1dJOOeVpqdSc/edit"
    }

