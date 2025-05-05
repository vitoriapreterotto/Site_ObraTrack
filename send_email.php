<?php
error_reporting(0); // Desativa a exibição de erros
ini_set('display_errors', 0);

header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name']) && isset($data['email']) && isset($data['message'])) {
        $name = strip_tags(trim($data['name']));  // Limpa a entrada!
        $email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL); // Valida o e-mail!
        $message = strip_tags(trim($data['message'])); // Limpa a entrada!

        if ($email) {
            $to = "obratrack46@gmail.com";  //  E-MAIL PARA ONDE AS MENSAGENS SERÃO ENVIADAS
            $subject = "Nova Submissão de Formulário de Contato";
            $body = "Nome: $name\nE-mail: $email\nMensagem:\n$message";
            $headers = "From: $email";

            if (mail($to, $subject, $body, $headers)) {
                echo "Mensagem enviada com sucesso!";
            } else {
                echo "Erro ao enviar a mensagem.";
            }
        } else {
            echo "E-mail inválido.";
        }
    } else {
        echo "Por favor, preencha todos os campos.";
    }
} else {
    echo "Método de requisição inválido.";
}
?>