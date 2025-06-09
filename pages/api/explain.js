export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { verse } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!verse || !apiKey) {
    return res.status(400).json({ error: 'Missing verse or API key' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Explain the meaning of the Bible verse: "${verse}".` }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ explanation: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'OpenAI API request failed' });
  }
}
