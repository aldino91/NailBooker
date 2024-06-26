export const htmlForgotPassword = (link: string): string => {
	return `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reimposta Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .email-container {
            background-color: #ffffff;
            padding: 20px;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
        }
        .email-header {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
        }
        .email-body {
            font-size: 16px;
            color: #666666;
            margin-top: 20px;
        }
        .email-button {
            margin-top: 30px;
        }
        .email-button a {
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .email-footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Reimposta la tua Password
        </div>
        <div class="email-body">
            <p>Hai richiesto di reimpostare la tua password. Clicca sul pulsante qui sotto per procedere.</p>
        </div>
        <div class="email-button">
            <a href=${link} target="_blank">Reimposta Password</a>
        </div>
        <div class="email-footer">
            <p>Se non hai richiesto questo cambiamento, puoi ignorare questa email.</p>
            <p>Grazie,<br>Il team di supporto</p>
        </div>
    </div>
</body>
</html>



`;
};
