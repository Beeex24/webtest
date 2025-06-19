export async function post({ request }) {
    try {
        // フォームデータを取得
        const formData = await request.formData();
        const companyName = formData.get('companyName');
        const contactPerson = formData.get('contactPerson');
        const corporateEmail = formData.get('corporateEmail');
        const corporateMessage = formData.get('corporateMessage');

        // 必須項目のチェック
        if (!companyName || !contactPerson || !corporateEmail || !corporateMessage) {
            return new Response(JSON.stringify({ error: 'すべての必須項目を入力してください。' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // デバッグ用: 送信されたデータをログに出力
        console.log('法人・団体向けお問い合わせ:', {
            companyName,
            contactPerson,
            corporateEmail,
            corporateMessage,
        });

        // ここでデータを保存したり、メールを送信したりする処理を追加
        // 例: メール送信処理
        // await sendEmail({
        //     to: 'your-email@example.com',
        //     subject: `法人・団体向けお問い合わせ: ${companyName}`,
        //     body: `
        //         会社名: ${companyName}
        //         担当者名: ${contactPerson}
        //         メールアドレス: ${corporateEmail}
        //         お問い合わせ内容: ${corporateMessage}
        //     `,
        // });

        // 成功レスポンスを返す
        return new Response(JSON.stringify({ message: 'お問い合わせを受け付けました。' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('お問い合わせ処理中にエラーが発生しました:', error);

        // エラーレスポンスを返す
        return new Response(JSON.stringify({ error: 'サーバーエラーが発生しました。' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}