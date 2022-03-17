const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLEAPI_CLIENT_ID, process.env.GOOGLEAPI_CLIENT_SECRET, process.env.GOOGLEAPI_REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLEAPI_REFRESH_TOKEN });

module.exports.sendStudentRegistrationEmail = async (parentName, password, email) => {


    try {
        var htmlString = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
            '<html xmlns:v="urn:schemas-microsoft-com:vml">' +
            '  <head>' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
            '    <meta' +
            '      name="viewport"' +
            '      content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"' +
            '    />' +
            '    <!--[if !mso]-->' +
            '    <!-- -->' +
            '    <link' +
            '      href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700"' +
            '      rel="stylesheet"' +
            '    />' +
            '    <link' +
            '      href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700"' +
            '      rel="stylesheet"' +
            '    />' +
            '    <!--<![endif]-->' +
            '' +
            '    <style type="text/css">' +
            '      body {' +
            '        width: 100%;' +
            '        background-color: #ffffff;' +
            '        margin: 0;' +
            '        padding: 0;' +
            '        -webkit-font-smoothing: antialiased;' +
            '        mso-margin-top-alt: 0px;' +
            '        mso-margin-bottom-alt: 0px;' +
            '        mso-padding-alt: 0px 0px 0px 0px;' +
            '      }' +
            '' +
            '      p,' +
            '      h1,' +
            '      h2,' +
            '      h3,' +
            '      h4 {' +
            '        margin-top: 0;' +
            '        margin-bottom: 0;' +
            '        padding-top: 0;' +
            '        padding-bottom: 0;' +
            '      }' +
            '' +
            '      span.preheader {' +
            '        display: none;' +
            '        font-size: 1px;' +
            '      }' +
            '' +
            '      html {' +
            '        width: 100%;' +
            '      }' +
            '' +
            '      table {' +
            '        font-size: 14px;' +
            '        border: 0;' +
            '      }' +
            '      /* ----------- responsivity ----------- */' +
            '' +
            '      @media only screen and (max-width: 640px) {' +
            '        /*------ top header ------ */' +
            '        .main-header {' +
            '          font-size: 20px !important;' +
            '        }' +
            '        .main-section-header {' +
            '          font-size: 28px !important;' +
            '        }' +
            '        .show {' +
            '          display: block !important;' +
            '        }' +
            '        .hide {' +
            '          display: none !important;' +
            '        }' +
            '        .align-center {' +
            '          text-align: center !important;' +
            '        }' +
            '        .no-bg {' +
            '          background: none !important;' +
            '        }' +
            '        /*----- main image -------*/' +
            '        .main-image img {' +
            '          width: 440px !important;' +
            '          height: auto !important;' +
            '        }' +
            '        /* ====== divider ====== */' +
            '        .divider img {' +
            '          width: 440px !important;' +
            '        }' +
            '        /*-------- container --------*/' +
            '        .container590 {' +
            '          width: 440px !important;' +
            '        }' +
            '        .container580 {' +
            '          width: 400px !important;' +
            '        }' +
            '        .main-button {' +
            '          width: 220px !important;' +
            '        }' +
            '        /*-------- secions ----------*/' +
            '        .section-img img {' +
            '          width: 320px !important;' +
            '          height: auto !important;' +
            '        }' +
            '        .team-img img {' +
            '          width: 100% !important;' +
            '          height: auto !important;' +
            '        }' +
            '      }' +
            '' +
            '      @media only screen and (max-width: 479px) {' +
            '        /*------ top header ------ */' +
            '        .main-header {' +
            '          font-size: 18px !important;' +
            '        }' +
            '        .main-section-header {' +
            '          font-size: 26px !important;' +
            '        }' +
            '        /* ====== divider ====== */' +
            '        .divider img {' +
            '          width: 280px !important;' +
            '        }' +
            '        /*-------- container --------*/' +
            '        .container590 {' +
            '          width: 280px !important;' +
            '        }' +
            '        .container590 {' +
            '          width: 280px !important;' +
            '        }' +
            '        .container580 {' +
            '          width: 260px !important;' +
            '        }' +
            '        /*-------- secions ----------*/' +
            '        .section-img img {' +
            '          width: 280px !important;' +
            '          height: auto !important;' +
            '        }' +
            '      }' +
            '    </style>' +
            '    <!--[if gte mso 9]><style type=â€text/cssâ€>' +
            '        body {' +
            '        font-family: arial, sans-serif!important;' +
            '        }' +
            '        </style>' +
            '    <![endif]-->' +
            '  </head>' +
            '' +
            '  <body' +
            '    class="respond"' +
            '    leftmargin="0"' +
            '    topmargin="0"' +
            '    marginwidth="0"' +
            '    marginheight="0"' +
            '  >' +
            '    <!-- pre-header -->' +
            '' +
            '    <!-- pre-header end -->' +
            '    <!-- header -->' +
            '    <table' +
            '      border="0"' +
            '      width="100%"' +
            '      cellpadding="0"' +
            '      cellspacing="0"' +
            '      bgcolor="ffffff"' +
            '    >' +
            '      <tr>' +
            '        <td align="center">' +
            '          <table' +
            '            border="0"' +
            '            align="center"' +
            '            width="590"' +
            '            cellpadding="0"' +
            '            cellspacing="0"' +
            '            class="container590"' +
            '          >' +
            '            <tr>' +
            '              <td height="25" style="font-size: 25px; line-height: 25px">' +
            '                 ' +
            '              </td>' +
            '            </tr>' +
            '' +
            '            <tr>' +
            '              <td height="25" style="font-size: 25px; line-height: 25px">' +
            '                 ' +
            '              </td>' +
            '            </tr>' +
            '          </table>' +
            '        </td>' +
            '      </tr>' +
            '    </table>' +
            '    <!-- end header -->' +
            '' +
            '    <!-- big image section -->' +
            '' +
            '    <table' +
            '      border="0"' +
            '      width="100%"' +
            '      cellpadding="0"' +
            '      cellspacing="0"' +
            '      bgcolor="ffffff"' +
            '      class="bg_color"' +
            '    >' +
            '      <tr>' +
            '        <td align="center">' +
            '          <table' +
            '            border="0"' +
            '            align="center"' +
            '            width="590"' +
            '            cellpadding="0"' +
            '            cellspacing="0"' +
            '            class="container590"' +
            '          >' +
            '            <tr>' +
            '              <td' +
            '                align="center"' +
            '                style="' +
            '                  color: #343434;' +
            '                  font-size: 24px;' +
            '                  font-family: Quicksand, Calibri, sans-serif;' +
            '                  font-weight: 700;' +
            '                  letter-spacing: 3px;' +
            '                  line-height: 35px;' +
            '                "' +
            '                class="main-header"' +
            '              >' +
            '                <!-- section text ======-->' +
            '' +
            '                <div style="line-height: 35px">' +
            '                  Hi '+ parentName +' ' +
            '                </div>' +
            '              </td>' +
            '            </tr>' +
            '' +
            '            <tr>' +
            '              <td height="10" style="font-size: 10px; line-height: 10px">' +
            '                 ' +
            '              </td>' +
            '            </tr>' +
            '' +
            '            <tr>' +
            '              <td align="center">' +
            '                <table' +
            '                  border="0"' +
            '                  width="40"' +
            '                  align="center"' +
            '                  cellpadding="0"' +
            '                  cellspacing="0"' +
            '                  bgcolor="eeeeee"' +
            '                >' +
            '                  <tr>' +
            '                    <td height="2" style="font-size: 2px; line-height: 2px">' +
            '                       ' +
            '                    </td>' +
            '                  </tr>' +
            '                </table>' +
            '              </td>' +
            '            </tr>' +
            '' +
            '            <tr>' +
            '              <td height="20" style="font-size: 20px; line-height: 20px">' +
            '                 ' +
            '              </td>' +
            '            </tr>' +
            '' +
            '            <tr>' +
            '              <td align="left">' +
            '                <table' +
            '                  border="0"' +
            '                  width="590"' +
            '                  align="center"' +
            '                  cellpadding="0"' +
            '                  cellspacing="0"' +
            '                  class="container590"' +
            '                >' +
            '                  <tr>' +
            '                    <td' +
            '                      align="left"' +
            '                      style="' +
            '                        color: #888888;' +
            '                        font-size: 16px;' +
            '                        font-family: \'Work Sans\', Calibri, sans-serif;' +
            '                        line-height: 24px;' +
            '                      "' +
            '                    >' +
            '                      <!-- section text ======-->' +
            '' +
            '                      <p style="line-height: 24px; margin-bottom: 15px">' +
            '                        Email: ' + email +'<br />' +
            '                        Password: '+ password +' ' +
            '                      </p>' +
            '                      <p style="line-height: 24px; margin-bottom: 15px">' +
            '                        Your child\'s account has been created in School Monitor successfully. You can now access your child\'s information by logging in to the mobile app with your email and password which can be found above. You can now see and get regular updates about your child\'s activities in school.' +
            '                      </p>' +
            '                      <p style="line-height: 24px; margin-bottom: 20px">' +
            '                        Remember you can change the password to your prefered password in the app.' +
            '                      </p>' +
            '                      ' +
            '                    </td>' +
            '                  </tr>' +
            '                </table>' +
            '              </td>' +
            '            </tr>' +
            '          </table>' +
            '        </td>' +
            '      </tr>' +
            '' +
            '      <tr>' +
            '        <td height="40" style="font-size: 40px; line-height: 40px"> </td>' +
            '      </tr>' +
            '    </table>' +
            '' +
            '    <!-- end section -->' +
            '' +
            '    <!-- end section -->' +
            '' +
            '    <!-- contact section -->' +
            '' +
            '    <!-- end section -->' +
            '' +
            '    <!-- footer ====== -->' +
            '' +
            '    <!-- end fooer ====== -->' +
            '  </body>' +
            '</html>';
        const accessToken = await oAuth2Client.getAccessToken;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: "smtp.ethereal.email",
            // port: 465,
            // secure: true, // true for 465, false for other ports
            auth: {
                type: 'OAuth2',
                user: 'stanchidi373@gmail.com',
                clientId: process.env.GOOGLEAPI_CLIENT_ID,
                clientSecret: process.env.GOOGLEAPI_CLIENT_SECRET,
                refreshToken: process.env.GOOGLEAPI_REFRESH_TOKEN,
                accessToken: accessToken
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"School Monitor" <school-monitor.co.uk>', // sender address
            to: email, // list of receivers
            subject: "Child Account Created Successfully ✔", // Subject line
            text: "Child Account Created Successfully ", // plain text body
            html: htmlString, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        throw Error(error.message);
    }
}

module.exports.sendAddedGradeEmail = async (parentName, assessmentType, dateTaken, email) => {
    try {
        var htmlString = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
        '<html xmlns:v="urn:schemas-microsoft-com:vml">'+
        '  <head>'+
        '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '    <meta'+
        '      name="viewport"'+
        '      content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"'+
        '    />'+
        '    <!--[if !mso]-->'+
        '    <!-- -->'+
        '    <link'+
        '      href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700"'+
        '      rel="stylesheet"'+
        '    />'+
        '    <link'+
        '      href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700"'+
        '      rel="stylesheet"'+
        '    />'+
        '    <!--<![endif]-->'+
        ''+
        '    <style type="text/css">'+
        '      body {'+
        '        width: 100%;'+
        '        background-color: #ffffff;'+
        '        margin: 0;'+
        '        padding: 0;'+
        '        -webkit-font-smoothing: antialiased;'+
        '        mso-margin-top-alt: 0px;'+
        '        mso-margin-bottom-alt: 0px;'+
        '        mso-padding-alt: 0px 0px 0px 0px;'+
        '      }'+
        ''+
        '      p,'+
        '      h1,'+
        '      h2,'+
        '      h3,'+
        '      h4 {'+
        '        margin-top: 0;'+
        '        margin-bottom: 0;'+
        '        padding-top: 0;'+
        '        padding-bottom: 0;'+
        '      }'+
        ''+
        '      span.preheader {'+
        '        display: none;'+
        '        font-size: 1px;'+
        '      }'+
        ''+
        '      html {'+
        '        width: 100%;'+
        '      }'+
        ''+
        '      table {'+
        '        font-size: 14px;'+
        '        border: 0;'+
        '      }'+
        '      /* ----------- responsivity ----------- */'+
        ''+
        '      @media only screen and (max-width: 640px) {'+
        '        /*------ top header ------ */'+
        '        .main-header {'+
        '          font-size: 20px !important;'+
        '        }'+
        '        .main-section-header {'+
        '          font-size: 28px !important;'+
        '        }'+
        '        .show {'+
        '          display: block !important;'+
        '        }'+
        '        .hide {'+
        '          display: none !important;'+
        '        }'+
        '        .align-center {'+
        '          text-align: center !important;'+
        '        }'+
        '        .no-bg {'+
        '          background: none !important;'+
        '        }'+
        '        /*----- main image -------*/'+
        '        .main-image img {'+
        '          width: 440px !important;'+
        '          height: auto !important;'+
        '        }'+
        '        /* ====== divider ====== */'+
        '        .divider img {'+
        '          width: 440px !important;'+
        '        }'+
        '        /*-------- container --------*/'+
        '        .container590 {'+
        '          width: 440px !important;'+
        '        }'+
        '        .container580 {'+
        '          width: 400px !important;'+
        '        }'+
        '        .main-button {'+
        '          width: 220px !important;'+
        '        }'+
        '        /*-------- secions ----------*/'+
        '        .section-img img {'+
        '          width: 320px !important;'+
        '          height: auto !important;'+
        '        }'+
        '        .team-img img {'+
        '          width: 100% !important;'+
        '          height: auto !important;'+
        '        }'+
        '      }'+
        ''+
        '      @media only screen and (max-width: 479px) {'+
        '        /*------ top header ------ */'+
        '        .main-header {'+
        '          font-size: 18px !important;'+
        '        }'+
        '        .main-section-header {'+
        '          font-size: 26px !important;'+
        '        }'+
        '        /* ====== divider ====== */'+
        '        .divider img {'+
        '          width: 280px !important;'+
        '        }'+
        '        /*-------- container --------*/'+
        '        .container590 {'+
        '          width: 280px !important;'+
        '        }'+
        '        .container590 {'+
        '          width: 280px !important;'+
        '        }'+
        '        .container580 {'+
        '          width: 260px !important;'+
        '        }'+
        '        /*-------- secions ----------*/'+
        '        .section-img img {'+
        '          width: 280px !important;'+
        '          height: auto !important;'+
        '        }'+
        '      }'+
        '    </style>'+
        '    <!--[if gte mso 9]><style type=â€text/cssâ€>'+
        '        body {'+
        '        font-family: arial, sans-serif!important;'+
        '        }'+
        '        </style>'+
        '    <![endif]-->'+
        '  </head>'+
        ''+
        '  <body'+
        '    class="respond"'+
        '    leftmargin="0"'+
        '    topmargin="0"'+
        '    marginwidth="0"'+
        '    marginheight="0"'+
        '  >'+
        '    <!-- pre-header -->'+
        ''+
        '    <!-- pre-header end -->'+
        '    <!-- header -->'+
        '    <table'+
        '      border="0"'+
        '      width="100%"'+
        '      cellpadding="0"'+
        '      cellspacing="0"'+
        '      bgcolor="ffffff"'+
        '    >'+
        '      <tr>'+
        '        <td align="center">'+
        '          <table'+
        '            border="0"'+
        '            align="center"'+
        '            width="590"'+
        '            cellpadding="0"'+
        '            cellspacing="0"'+
        '            class="container590"'+
        '          >'+
        '            <tr>'+
        '              <td height="25" style="font-size: 25px; line-height: 25px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="25" style="font-size: 25px; line-height: 25px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        '          </table>'+
        '        </td>'+
        '      </tr>'+
        '    </table>'+
        '    <!-- end header -->'+
        ''+
        '    <!-- big image section -->'+
        ''+
        '    <table'+
        '      border="0"'+
        '      width="100%"'+
        '      cellpadding="0"'+
        '      cellspacing="0"'+
        '      bgcolor="ffffff"'+
        '      class="bg_color"'+
        '    >'+
        '      <tr>'+
        '        <td align="center">'+
        '          <table'+
        '            border="0"'+
        '            align="center"'+
        '            width="590"'+
        '            cellpadding="0"'+
        '            cellspacing="0"'+
        '            class="container590"'+
        '          >'+
        '            <tr>'+
        '              <td'+
        '                align="center"'+
        '                style="'+
        '                  color: #343434;'+
        '                  font-size: 24px;'+
        '                  font-family: Quicksand, Calibri, sans-serif;'+
        '                  font-weight: 700;'+
        '                  letter-spacing: 3px;'+
        '                  line-height: 35px;'+
        '                "'+
        '                class="main-header"'+
        '              >'+
        '                <!-- section text ======-->'+
        ''+
        '                <div style="line-height: 35px">'+
        '                  Hi ' + parentName +''+
        '                </div>'+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="10" style="font-size: 10px; line-height: 10px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td align="center">'+
        '                <table'+
        '                  border="0"'+
        '                  width="40"'+
        '                  align="center"'+
        '                  cellpadding="0"'+
        '                  cellspacing="0"'+
        '                  bgcolor="eeeeee"'+
        '                >'+
        '                  <tr>'+
        '                    <td height="2" style="font-size: 2px; line-height: 2px">'+
        '                       '+
        '                    </td>'+
        '                  </tr>'+
        '                </table>'+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="20" style="font-size: 20px; line-height: 20px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td align="left">'+
        '                <table'+
        '                  border="0"'+
        '                  width="590"'+
        '                  align="center"'+
        '                  cellpadding="0"'+
        '                  cellspacing="0"'+
        '                  class="container590"'+
        '                >'+
        '                  <tr>'+
        '                    <td'+
        '                      align="left"'+
        '                      style="'+
        '                        color: #888888;'+
        '                        font-size: 16px;'+
        '                        font-family: \'Work Sans\', Calibri, sans-serif;'+
        '                        line-height: 24px;'+
        '                      "'+
        '                    >'+
        '                      <!-- section text ======-->'+
        ''+
        '                      <p style="line-height: 24px; margin-bottom: 15px">'+
        '                        '+ assessmentType +' Graded <br />'+
        '                        '+
        '                      </p>'+
        '                      <p style="line-height: 24px; margin-bottom: 15px">'+
        '                        Your child\'s grade in a recent ' + assessmentType +' taken on the ' + dateTaken + ' has been marked and submitted, login to your School Monitor app to check the score.'+
        '                      </p>'+
        '                      <p style="line-height: 24px; margin-bottom: 20px">'+
        '                        Thank you, have a good day.'+
        '                      </p>'+
        '                      '+
        '                    </td>'+
        '                  </tr>'+
        '                </table>'+
        '              </td>'+
        '            </tr>'+
        '          </table>'+
        '        </td>'+
        '      </tr>'+
        ''+
        '      <tr>'+
        '        <td height="40" style="font-size: 40px; line-height: 40px"> </td>'+
        '      </tr>'+
        '    </table>'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- contact section -->'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- footer ====== -->'+
        ''+
        '    <!-- end fooer ====== -->'+
        '  </body>'+
        '</html>';
        const accessToken = await oAuth2Client.getAccessToken;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: "smtp.ethereal.email",
            // port: 465,
            // secure: true, // true for 465, false for other ports
            auth: {
                type: 'OAuth2',
                user: 'stanchidi373@gmail.com',
                clientId: process.env.GOOGLEAPI_CLIENT_ID,
                clientSecret: process.env.GOOGLEAPI_CLIENT_SECRET,
                refreshToken: process.env.GOOGLEAPI_REFRESH_TOKEN,
                accessToken: accessToken
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"School Monitor" <school-monitor.co.uk>', // sender address
            to: email, // list of receivers
            subject: "Child "+ assessmentType + " Score Updated ✔", // Subject line
            text: "Child "+ assessmentType + " Score Updated ✔", // plain text body
            html: htmlString, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        throw Error(error.message);
    }
}


module.exports.sendAttendanceEmail = async (parentName, date, email) => {
    try {
        var htmlString = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
        '<html xmlns:v="urn:schemas-microsoft-com:vml">'+
        '  <head>'+
        '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '    <meta'+
        '      name="viewport"'+
        '      content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"'+
        '    />'+
        '    <!--[if !mso]-->'+
        '    <!-- -->'+
        '    <link'+
        '      href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700"'+
        '      rel="stylesheet"'+
        '    />'+
        '    <link'+
        '      href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700"'+
        '      rel="stylesheet"'+
        '    />'+
        '    <!--<![endif]-->'+
        ''+
        '    <style type="text/css">'+
        '      body {'+
        '        width: 100%;'+
        '        background-color: #ffffff;'+
        '        margin: 0;'+
        '        padding: 0;'+
        '        -webkit-font-smoothing: antialiased;'+
        '        mso-margin-top-alt: 0px;'+
        '        mso-margin-bottom-alt: 0px;'+
        '        mso-padding-alt: 0px 0px 0px 0px;'+
        '      }'+
        ''+
        '      p,'+
        '      h1,'+
        '      h2,'+
        '      h3,'+
        '      h4 {'+
        '        margin-top: 0;'+
        '        margin-bottom: 0;'+
        '        padding-top: 0;'+
        '        padding-bottom: 0;'+
        '      }'+
        ''+
        '      span.preheader {'+
        '        display: none;'+
        '        font-size: 1px;'+
        '      }'+
        ''+
        '      html {'+
        '        width: 100%;'+
        '      }'+
        ''+
        '      table {'+
        '        font-size: 14px;'+
        '        border: 0;'+
        '      }'+
        '      /* ----------- responsivity ----------- */'+
        ''+
        '      @media only screen and (max-width: 640px) {'+
        '        /*------ top header ------ */'+
        '        .main-header {'+
        '          font-size: 20px !important;'+
        '        }'+
        '        .main-section-header {'+
        '          font-size: 28px !important;'+
        '        }'+
        '        .show {'+
        '          display: block !important;'+
        '        }'+
        '        .hide {'+
        '          display: none !important;'+
        '        }'+
        '        .align-center {'+
        '          text-align: center !important;'+
        '        }'+
        '        .no-bg {'+
        '          background: none !important;'+
        '        }'+
        '        /*----- main image -------*/'+
        '        .main-image img {'+
        '          width: 440px !important;'+
        '          height: auto !important;'+
        '        }'+
        '        /* ====== divider ====== */'+
        '        .divider img {'+
        '          width: 440px !important;'+
        '        }'+
        '        /*-------- container --------*/'+
        '        .container590 {'+
        '          width: 440px !important;'+
        '        }'+
        '        .container580 {'+
        '          width: 400px !important;'+
        '        }'+
        '        .main-button {'+
        '          width: 220px !important;'+
        '        }'+
        '        /*-------- secions ----------*/'+
        '        .section-img img {'+
        '          width: 320px !important;'+
        '          height: auto !important;'+
        '        }'+
        '        .team-img img {'+
        '          width: 100% !important;'+
        '          height: auto !important;'+
        '        }'+
        '      }'+
        ''+
        '      @media only screen and (max-width: 479px) {'+
        '        /*------ top header ------ */'+
        '        .main-header {'+
        '          font-size: 18px !important;'+
        '        }'+
        '        .main-section-header {'+
        '          font-size: 26px !important;'+
        '        }'+
        '        /* ====== divider ====== */'+
        '        .divider img {'+
        '          width: 280px !important;'+
        '        }'+
        '        /*-------- container --------*/'+
        '        .container590 {'+
        '          width: 280px !important;'+
        '        }'+
        '        .container590 {'+
        '          width: 280px !important;'+
        '        }'+
        '        .container580 {'+
        '          width: 260px !important;'+
        '        }'+
        '        /*-------- secions ----------*/'+
        '        .section-img img {'+
        '          width: 280px !important;'+
        '          height: auto !important;'+
        '        }'+
        '      }'+
        '    </style>'+
        '    <!--[if gte mso 9]><style type=â€text/cssâ€>'+
        '        body {'+
        '        font-family: arial, sans-serif!important;'+
        '        }'+
        '        </style>'+
        '    <![endif]-->'+
        '  </head>'+
        ''+
        '  <body'+
        '    class="respond"'+
        '    leftmargin="0"'+
        '    topmargin="0"'+
        '    marginwidth="0"'+
        '    marginheight="0"'+
        '  >'+
        '    <!-- pre-header -->'+
        ''+
        '    <!-- pre-header end -->'+
        '    <!-- header -->'+
        '    <table'+
        '      border="0"'+
        '      width="100%"'+
        '      cellpadding="0"'+
        '      cellspacing="0"'+
        '      bgcolor="ffffff"'+
        '    >'+
        '      <tr>'+
        '        <td align="center">'+
        '          <table'+
        '            border="0"'+
        '            align="center"'+
        '            width="590"'+
        '            cellpadding="0"'+
        '            cellspacing="0"'+
        '            class="container590"'+
        '          >'+
        '            <tr>'+
        '              <td height="25" style="font-size: 25px; line-height: 25px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="25" style="font-size: 25px; line-height: 25px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        '          </table>'+
        '        </td>'+
        '      </tr>'+
        '    </table>'+
        '    <!-- end header -->'+
        ''+
        '    <!-- big image section -->'+
        ''+
        '    <table'+
        '      border="0"'+
        '      width="100%"'+
        '      cellpadding="0"'+
        '      cellspacing="0"'+
        '      bgcolor="ffffff"'+
        '      class="bg_color"'+
        '    >'+
        '      <tr>'+
        '        <td align="center">'+
        '          <table'+
        '            border="0"'+
        '            align="center"'+
        '            width="590"'+
        '            cellpadding="0"'+
        '            cellspacing="0"'+
        '            class="container590"'+
        '          >'+
        '            <tr>'+
        '              <td'+
        '                align="center"'+
        '                style="'+
        '                  color: #343434;'+
        '                  font-size: 24px;'+
        '                  font-family: Quicksand, Calibri, sans-serif;'+
        '                  font-weight: 700;'+
        '                  letter-spacing: 3px;'+
        '                  line-height: 35px;'+
        '                "'+
        '                class="main-header"'+
        '              >'+
        '                <!-- section text ======-->'+
        ''+
        '                <div style="line-height: 35px">'+
        '                  Hi ' + parentName +' '+
        '                </div>'+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="10" style="font-size: 10px; line-height: 10px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td align="center">'+
        '                <table'+
        '                  border="0"'+
        '                  width="40"'+
        '                  align="center"'+
        '                  cellpadding="0"'+
        '                  cellspacing="0"'+
        '                  bgcolor="eeeeee"'+
        '                >'+
        '                  <tr>'+
        '                    <td height="2" style="font-size: 2px; line-height: 2px">'+
        '                       '+
        '                    </td>'+
        '                  </tr>'+
        '                </table>'+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="20" style="font-size: 20px; line-height: 20px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td align="left">'+
        '                <table'+
        '                  border="0"'+
        '                  width="590"'+
        '                  align="center"'+
        '                  cellpadding="0"'+
        '                  cellspacing="0"'+
        '                  class="container590"'+
        '                >'+
        '                  <tr>'+
        '                    <td'+
        '                      align="left"'+
        '                      style="'+
        '                        color: #888888;'+
        '                        font-size: 16px;'+
        '                        font-family: \'Work Sans\', Calibri, sans-serif;'+
        '                        line-height: 24px;'+
        '                      "'+
        '                    >'+
        '                      <!-- section text ======-->'+
        ''+
        '                      <p style="line-height: 24px; margin-bottom: 15px">'+
        '                        Absent Child <br />'+
        '                        '+
        '                      </p>'+
        '                      <p style="line-height: 24px; margin-bottom: 15px">'+
        '                        Your child was absent in school today this date ' + date +' from our attendance record, login to your school monitor app to check your child\'s attendance.'+
        '                      </p>'+
        '                      <p style="line-height: 24px; margin-bottom: 20px">'+
        '                        Thank you, have a good day.'+
        '                      </p>'+
        '                      '+
        '                    </td>'+
        '                  </tr>'+
        '                </table>'+
        '              </td>'+
        '            </tr>'+
        '          </table>'+
        '        </td>'+
        '      </tr>'+
        ''+
        '      <tr>'+
        '        <td height="40" style="font-size: 40px; line-height: 40px"> </td>'+
        '      </tr>'+
        '    </table>'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- contact section -->'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- footer ====== -->'+
        ''+
        '    <!-- end fooer ====== -->'+
        '  </body>'+
        '</html>';
            
        
        const accessToken = await oAuth2Client.getAccessToken;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: "smtp.ethereal.email",
            // port: 465,
            // secure: true, // true for 465, false for other ports
            auth: {
                type: 'OAuth2',
                user: 'stanchidi373@gmail.com',
                clientId: process.env.GOOGLEAPI_CLIENT_ID,
                clientSecret: process.env.GOOGLEAPI_CLIENT_SECRET,
                refreshToken: process.env.GOOGLEAPI_REFRESH_TOKEN,
                accessToken: accessToken
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"School Monitor" <school-monitor.co.uk>', // sender address
            to: email, // list of receivers
            subject: "Child Attendance ✔", // Subject line
            text: "Child Attendance ✔", // plain text body
            html: htmlString, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        throw Error(error.message);
    }
}


module.exports.sendEventEmail = async (parentName, email) => {
    try {
        var htmlString = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
        '<html xmlns:v="urn:schemas-microsoft-com:vml">'+
        '  <head>'+
        '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '    <meta'+
        '      name="viewport"'+
        '      content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"'+
        '    />'+
        '    <!--[if !mso]-->'+
        '    <!-- -->'+
        '    <link'+
        '      href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700"'+
        '      rel="stylesheet"'+
        '    />'+
        '    <link'+
        '      href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700"'+
        '      rel="stylesheet"'+
        '    />'+
        '    <!--<![endif]-->'+
        ''+
        '    <style type="text/css">'+
        '      body {'+
        '        width: 100%;'+
        '        background-color: #ffffff;'+
        '        margin: 0;'+
        '        padding: 0;'+
        '        -webkit-font-smoothing: antialiased;'+
        '        mso-margin-top-alt: 0px;'+
        '        mso-margin-bottom-alt: 0px;'+
        '        mso-padding-alt: 0px 0px 0px 0px;'+
        '      }'+
        ''+
        '      p,'+
        '      h1,'+
        '      h2,'+
        '      h3,'+
        '      h4 {'+
        '        margin-top: 0;'+
        '        margin-bottom: 0;'+
        '        padding-top: 0;'+
        '        padding-bottom: 0;'+
        '      }'+
        ''+
        '      span.preheader {'+
        '        display: none;'+
        '        font-size: 1px;'+
        '      }'+
        ''+
        '      html {'+
        '        width: 100%;'+
        '      }'+
        ''+
        '      table {'+
        '        font-size: 14px;'+
        '        border: 0;'+
        '      }'+
        '      /* ----------- responsivity ----------- */'+
        ''+
        '      @media only screen and (max-width: 640px) {'+
        '        /*------ top header ------ */'+
        '        .main-header {'+
        '          font-size: 20px !important;'+
        '        }'+
        '        .main-section-header {'+
        '          font-size: 28px !important;'+
        '        }'+
        '        .show {'+
        '          display: block !important;'+
        '        }'+
        '        .hide {'+
        '          display: none !important;'+
        '        }'+
        '        .align-center {'+
        '          text-align: center !important;'+
        '        }'+
        '        .no-bg {'+
        '          background: none !important;'+
        '        }'+
        '        /*----- main image -------*/'+
        '        .main-image img {'+
        '          width: 440px !important;'+
        '          height: auto !important;'+
        '        }'+
        '        /* ====== divider ====== */'+
        '        .divider img {'+
        '          width: 440px !important;'+
        '        }'+
        '        /*-------- container --------*/'+
        '        .container590 {'+
        '          width: 440px !important;'+
        '        }'+
        '        .container580 {'+
        '          width: 400px !important;'+
        '        }'+
        '        .main-button {'+
        '          width: 220px !important;'+
        '        }'+
        '        /*-------- secions ----------*/'+
        '        .section-img img {'+
        '          width: 320px !important;'+
        '          height: auto !important;'+
        '        }'+
        '        .team-img img {'+
        '          width: 100% !important;'+
        '          height: auto !important;'+
        '        }'+
        '      }'+
        ''+
        '      @media only screen and (max-width: 479px) {'+
        '        /*------ top header ------ */'+
        '        .main-header {'+
        '          font-size: 18px !important;'+
        '        }'+
        '        .main-section-header {'+
        '          font-size: 26px !important;'+
        '        }'+
        '        /* ====== divider ====== */'+
        '        .divider img {'+
        '          width: 280px !important;'+
        '        }'+
        '        /*-------- container --------*/'+
        '        .container590 {'+
        '          width: 280px !important;'+
        '        }'+
        '        .container590 {'+
        '          width: 280px !important;'+
        '        }'+
        '        .container580 {'+
        '          width: 260px !important;'+
        '        }'+
        '        /*-------- secions ----------*/'+
        '        .section-img img {'+
        '          width: 280px !important;'+
        '          height: auto !important;'+
        '        }'+
        '      }'+
        '    </style>'+
        '    <!--[if gte mso 9]><style type=â€text/cssâ€>'+
        '        body {'+
        '        font-family: arial, sans-serif!important;'+
        '        }'+
        '        </style>'+
        '    <![endif]-->'+
        '  </head>'+
        ''+
        '  <body'+
        '    class="respond"'+
        '    leftmargin="0"'+
        '    topmargin="0"'+
        '    marginwidth="0"'+
        '    marginheight="0"'+
        '  >'+
        '    <!-- pre-header -->'+
        ''+
        '    <!-- pre-header end -->'+
        '    <!-- header -->'+
        '    <table'+
        '      border="0"'+
        '      width="100%"'+
        '      cellpadding="0"'+
        '      cellspacing="0"'+
        '      bgcolor="ffffff"'+
        '    >'+
        '      <tr>'+
        '        <td align="center">'+
        '          <table'+
        '            border="0"'+
        '            align="center"'+
        '            width="590"'+
        '            cellpadding="0"'+
        '            cellspacing="0"'+
        '            class="container590"'+
        '          >'+
        '            <tr>'+
        '              <td height="25" style="font-size: 25px; line-height: 25px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="25" style="font-size: 25px; line-height: 25px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        '          </table>'+
        '        </td>'+
        '      </tr>'+
        '    </table>'+
        '    <!-- end header -->'+
        ''+
        '    <!-- big image section -->'+
        ''+
        '    <table'+
        '      border="0"'+
        '      width="100%"'+
        '      cellpadding="0"'+
        '      cellspacing="0"'+
        '      bgcolor="ffffff"'+
        '      class="bg_color"'+
        '    >'+
        '      <tr>'+
        '        <td align="center">'+
        '          <table'+
        '            border="0"'+
        '            align="center"'+
        '            width="590"'+
        '            cellpadding="0"'+
        '            cellspacing="0"'+
        '            class="container590"'+
        '          >'+
        '            <tr>'+
        '              <td'+
        '                align="center"'+
        '                style="'+
        '                  color: #343434;'+
        '                  font-size: 24px;'+
        '                  font-family: Quicksand, Calibri, sans-serif;'+
        '                  font-weight: 700;'+
        '                  letter-spacing: 3px;'+
        '                  line-height: 35px;'+
        '                "'+
        '                class="main-header"'+
        '              >'+
        '                <!-- section text ======-->'+
        ''+
        '                <div style="line-height: 35px">'+
        '                  Hi ' + parentName +''+
        '                </div>'+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="10" style="font-size: 10px; line-height: 10px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td align="center">'+
        '                <table'+
        '                  border="0"'+
        '                  width="40"'+
        '                  align="center"'+
        '                  cellpadding="0"'+
        '                  cellspacing="0"'+
        '                  bgcolor="eeeeee"'+
        '                >'+
        '                  <tr>'+
        '                    <td height="2" style="font-size: 2px; line-height: 2px">'+
        '                       '+
        '                    </td>'+
        '                  </tr>'+
        '                </table>'+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td height="20" style="font-size: 20px; line-height: 20px">'+
        '                 '+
        '              </td>'+
        '            </tr>'+
        ''+
        '            <tr>'+
        '              <td align="left">'+
        '                <table'+
        '                  border="0"'+
        '                  width="590"'+
        '                  align="center"'+
        '                  cellpadding="0"'+
        '                  cellspacing="0"'+
        '                  class="container590"'+
        '                >'+
        '                  <tr>'+
        '                    <td'+
        '                      align="left"'+
        '                      style="'+
        '                        color: #888888;'+
        '                        font-size: 16px;'+
        '                        font-family: \'Work Sans\', Calibri, sans-serif;'+
        '                        line-height: 24px;'+
        '                      "'+
        '                    >'+
        '                      <!-- section text ======-->'+
        ''+
        '                      <p style="line-height: 24px; margin-bottom: 15px">'+
        '                        Upcoming Event <br />'+
        '                        '+
        '                      </p>'+
        '                      <p style="line-height: 24px; margin-bottom: 15px">'+
        '                        There is an important upcoming event for your child at school please login to your school monitor app and open events page to see the new upcoming event added.'+
        '                      </p>'+
        '                      <p style="line-height: 24px; margin-bottom: 20px">'+
        '                        Thank you, have a good day.'+
        '                      </p>'+
        '                      '+
        '                    </td>'+
        '                  </tr>'+
        '                </table>'+
        '              </td>'+
        '            </tr>'+
        '          </table>'+
        '        </td>'+
        '      </tr>'+
        ''+
        '      <tr>'+
        '        <td height="40" style="font-size: 40px; line-height: 40px"> </td>'+
        '      </tr>'+
        '    </table>'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- contact section -->'+
        ''+
        '    <!-- end section -->'+
        ''+
        '    <!-- footer ====== -->'+
        ''+
        '    <!-- end fooer ====== -->'+
        '  </body>'+
        '</html>';
            
        
        const accessToken = await oAuth2Client.getAccessToken;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: "smtp.ethereal.email",
            // port: 465,
            // secure: true, // true for 465, false for other ports
            auth: {
                type: 'OAuth2',
                user: 'stanchidi373@gmail.com',
                clientId: process.env.GOOGLEAPI_CLIENT_ID,
                clientSecret: process.env.GOOGLEAPI_CLIENT_SECRET,
                refreshToken: process.env.GOOGLEAPI_REFRESH_TOKEN,
                accessToken: accessToken
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"School Monitor" <school-monitor.co.uk>', // sender address
            to: email, // list of receivers
            subject: "Upcoming Event ✔", // Subject line
            text: "Upcoming Event ✔", // plain text body
            html: htmlString, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        throw Error(error.message);
    }
}