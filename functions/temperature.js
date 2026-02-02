exports.handler = async (event) => {
  try {
    const { lat = "28.6139", lon = "77.2090" } = event.queryStringParameters || {};
    const apiKey = process.env.OPENWEATHER_API_KEY;

    console.log("Using URL:", `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);

    if (!apiKey) return { statusCode: 500, body: "API key missing" };

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.error("OpenWeather API Error:", text);
      return { statusCode: res.status, body: text };
    }

    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.error("Function Error:", err);
    return { statusCode: 500, body: err.message };
  }
};
