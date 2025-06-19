import nodemailer from 'nodemailer';

export async function post({ request }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // 簡単なバリデーション
    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: '全てのフィールドを入力してください。' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Nodemailer の設定
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // SMTP サーバーのホスト名（例: Gmail の場合は 'smtp.gmail.com'）
        port: 587, // SMTP ポート（通常は 587）
        secure: true, // TLS を使用する場合は false
        auth: {
            user: 'your-email@example.com', // 送信元メールアドレス
            pass: 'your-email-password', // メールアカウントのパスワード
        },
    });

    try {
        // メール送信
        await transporter.sendMail({
            from: '"お問い合わせフォーム" <your-email@example.com>', // 送信元
            to: 'beta.infoblog@gmail.com', // 受信先メールアドレス
            subject: `お問い合わせ: ${name}`, // 件名
            text: `名前: ${name}\nメール: ${email}\nメッセージ:\n${message}`, // メール本文（テキスト形式）
        });

        return new Response(JSON.stringify({ success: true, message: 'お問い合わせを受け付けました！' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('メール送信エラー:', error);
        return new Response(JSON.stringify({ error: 'メール送信に失敗しました。' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}