from telegram.ext import Updater, CommandHandler

# Replace with your token from BotFather
TOKEN = "8362804013:AAEWNMsMnNJJ2lFtB_89SFIR9RdJazCXTd8"

def start(update, context):
    update.message.reply_text("Hello!")  # <--- change reply text here

def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    # Command handler for /start
    dp.add_handler(CommandHandler("start", start))

    # Start polling
    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
