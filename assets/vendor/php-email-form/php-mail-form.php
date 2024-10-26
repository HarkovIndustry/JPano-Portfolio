<?php

class PHP_Email_Form {
  public $to;
  public $from_name;
  public $from_email;
  public $subject;
  public $smtp;
  public $messages = [];
  public $ajax = false;

  public function add_message($content, $type = 'text', $priority = 10) {
    $this->messages[] = ['content' => $content, 'type' => $type, 'priority' => $priority];
  }

  public function send() {
    $headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
    $headers .= "Reply-To: " . $this->from_email . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";

    $message = "";
    foreach ($this->messages as $msg) {
      $message .= "<p>" . $msg['type'] . ": " . $msg['content'] . "</p>";
    }

    if (!empty($this->smtp)) {
      // Using SMTP
      $mail = new PHPMailer(true);
      try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = $this->smtp['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $this->smtp['username'];
        $mail->Password   = $this->smtp['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $this->smtp['port'];

        //Recipients
        $mail->setFrom($this->from_email, $this->from_name);
        $mail->addAddress($this->to);

        //Content
        $mail->isHTML(true);
        $mail->Subject = $this->subject;
        $mail->Body    = $message;

        $mail->send();
        return 'Message has been sent';
      } catch (Exception $e) {
        return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
      }
    } else {
      // Using PHP mail()
      if (mail($this->to, $this->subject, $message, $headers)) {
        return 'Message has been sent';
      } else {
        return 'Message could not be sent';
      }
    }
  }
}
?>
