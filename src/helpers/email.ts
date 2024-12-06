export const makeEmail = (name: string, email: string, message: string) => {
	const markup = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link rel="preload" as="image" href="https://dou.gg/images/astrism.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style="background-color: #fff; margin: 0; padding: 0">
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width: 37.5em; padding: 40px 20px"
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <img
              alt="Dou.gg"
              height="34"
              src="https://dou.gg/images/astrism.png"
              style="
                display: block;
                outline: none;
                border: none;
                text-decoration: none;
              "
              width="40"
            />
            <h1
              style="
                font-family: system-ui, sans-serif;
                font-size: 24px;
                line-height: 1.3;
                font-weight: 400;
                color: #444;
                padding: 0;
                margin: 18px 0 0;
              "
            >
              New Contact Form Submission
            </h1>
            <p
              style="
                font-size: 16px;
                line-height: 1.5;
                margin: 0 0 20px;
                font-family: system-ui, sans-serif;
                font-weight: 300;
                color: #444;
              "
            >
              The following was received from
              <a
                href="#"
                style="
                  color: #444;
                  text-decoration-line: none;
                  text-decoration: underline;
                "
                target="_blank"
                >dou.gg</a
              >.
            </p>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #eee;
                margin: 24px 0;
              "
            />
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="
                        font-size: 16px;
                        line-height: 1.5;
                        margin: 0 0 20px;
                        font-family: system-ui, sans-serif;
                        font-weight: 300;
                        color: #444;
                      "
                    >
                      <strong>name:</strong>
                      ${name}<br />
                      <strong>email:</strong>
                      ${email}<br />
                    </p>
                    <p
                      style="
                        font-size: 16px;
                        line-height: 1.5;
                        margin: 0 0 20px;
                        font-family: system-ui, sans-serif;
                        font-weight: 300;
                        color: #444;
                        white-space: pre-wrap;
                      "
                    >${message}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

	return markup;
};
