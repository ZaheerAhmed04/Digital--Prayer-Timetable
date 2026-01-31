// ================= REAL-TIME TEMPERATURE =================
const tempBox = document.getElementById('temperature');

if (!tempBox) {
  console.error("Temperature element not found");
  // Stop execution if element is missing
} else if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`/.netlify/functions/temperature?lat=${lat}&lon=${lon}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Weather API failed: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (!data.main || typeof data.main.temp !== "number") {
            tempBox.textContent = "--°C";
            return;
          }

          tempBox.textContent =
            Math.round(data.main.temp) + "°C";
        })
        .catch(err => {
          console.error("Weather error:", err);
          tempBox.textContent = "--°C";
        });
    },
    error => {
      console.error("Location denied:", error);
      tempBox.textContent = "--°C";
    }
  );

} else {
  console.error("Geolocation not supported");
  tempBox.textContent = "--°C";
}
