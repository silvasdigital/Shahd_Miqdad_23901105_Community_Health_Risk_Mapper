# Community Health Risk Mapper

This project is an educational web application designed to demonstrate how geographic data and health metrics can be combined to visualize community health risks. It's a non-functional, educational tool that uses pre-set, simulated data.

The application loads an interactive map using **Leaflet.js** and places colored risk overlays on different communities. A **Chart.js** bar chart provides a visual breakdown of the risk factors for the selected area.

## ✨ Features

- **Interactive Map:** Uses Leaflet.js to display a fully interactive map.
- **Risk Overlays:** Dynamically draws colored circles on the map to represent high, medium, or low-risk zones.
- **Data Visualization:** A horizontal bar chart (using Chart.js) displays the underlying health metrics for each community (e.g., Air Quality, Park Access).
- **Pre-set Scenarios:** Includes 3 hard-coded community scenarios that users can load by clicking buttons.
- **Responsive Design:** The layout is mobile-friendly and centers content correctly on all screen sizes.
- **Modern Tech Stack:** Built with HTML, CSS, and JavaScript, and bundled with Webpack.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm (which comes with Node.js) installed on your system.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd community-health-risk-mapper
    ```

2.  **Install dependencies:**
    This command will install all the necessary packages defined in `package.json`, including `leaflet` and `chart.js`.
    ```bash
    npm install
    ```

### Running the Application

- **For Development:**
  This command starts a live development server and automatically opens the calculator in your browser.

  ```bash
  npm run start
  ```

- **For Production:**
  This command builds an optimized version of the application, ready for deployment. The optimized files will be placed in the `/dist` directory.
  ```bash
  npm run build
  ```
