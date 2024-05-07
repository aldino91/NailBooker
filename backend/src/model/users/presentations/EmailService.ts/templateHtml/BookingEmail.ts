export const htmlBooking = (date: string, time: string): string => {
	return `
    <html lang="en">
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1, p {
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Confirmación de Reserva</h1>
            <p>Estimado Cliente,</p>
            <p>Le informamos que su reserva ha sido confirmada:</p>
            <ul>
                <li><strong>Fecha de Reserva:</strong> ${date}</li>
                <li><strong>Hora de Reserva:</strong> ${time}</li>
                <!-- Puedes reemplazar estas fechas y horas con variables de tu aplicación -->
            </ul>
            <p>¡Esperamos verte pronto!</p>
        </div>
    </body>
    </html>
    

`;
};
