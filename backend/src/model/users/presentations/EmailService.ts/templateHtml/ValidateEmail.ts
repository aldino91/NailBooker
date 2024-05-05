export const htmalValidateEmail = (email: string, link: string): string => {
	return `<h2>¡Gracias por registrarte!</h2>

<p>Bienvenido/a a nuestra plataforma. Tu registro ha sido exitoso.</p>

<a href=${link} style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">Validacion email ${email}</a>

</body>


`;
};
