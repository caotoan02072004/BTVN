require("dotenv").config();
const { defineConfig } = require("cypress");
const path = require("path");
const Tesseract = require("tesseract.js");
const imaps = require("imap-simple");
const { simpleParser } = require("mailparser");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportPageTitle: "Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },

  retries: {
    runMode: 1,
    openMode: 1,
  },

  e2e: {
    baseUrl: "https://practice.expandtesting.com",

    setupNodeEvents(on, config) {
      // mochawesome

      on("task", {
        // ===== OCR =====
        ocr({ imagePath }) {
          const fullPath = path.resolve(imagePath);
          return Tesseract.recognize(fullPath, "eng")
            .then(({ data: { text } }) => text)
            .catch(() => null);
        },

        // ===== Gmail OTP =====
        async getOtp() {
          const connection = await imaps.connect({
            imap: {
              user: "nguyencaotoan534@gmail.com",
              password: "mais rbax jzrq ltdq",
              host: "imap.gmail.com",
              port: 993,
              tls: true,
            },
          });

          await connection.openBox("INBOX");

          const messages = await connection.search(["UNSEEN"], {
            bodies: [""],
          });

          if (!messages.length) return null;

          const parsed = await simpleParser(
            messages[messages.length - 1].parts[0].body
          );

          return parsed.text.match(/\b\d{6}\b/)[0];
        },
      });

      return config;
    },
  },
});