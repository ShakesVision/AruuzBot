const Telegraph = require("telegraf");
const axios = require("axios");

const bot = new Telegraph("1132680528:AAHMSsZBsxO4TwoaqKaas-BZ2fua2zJ5Wv4");

bot.start(ctx => {
    ctx.reply("Send in a she'r to find its Bahr & Wazn.");
});

bot.help(ctx => {
    ctx.reply("AruuzBot has following commands: \n /start \n /help");
});

bot.start(ctx => {
    ctx.reply("Bot started! Send in a she'r to find its Bahr & Wazn.");
});

bot.command('about', ctx => {
    ctx.reply("ABOUT: \n Author: Shakeeb Ahmad [ur.shakeeb.in] \n API: Syed Zeeshan Asghar [aruuz.com]");
});

bot.on("text", ctx => {
    let uri = "http://aruuz.com/api/default/getTaqti?text=";
    let input = "";
    input = ctx.message.text;
    let url = uri + input;
    url = encodeURI(url);
    let msg = "";

    let containsNewLine = /\r|\n/.exec(input);

    axios.get(url).then(res => {
        console.log("URL FETCHED. ", url);
        let data = res.data;
        console.log(data);
        if (!(data instanceof Array)) {
            data = [data];
        }

        if (containsNewLine) {
            msg = "ہر مصرع کے لیے نتائج:\n\n";
            data.forEach((r, i) => {
                if (r.feet) {
                    if (data.length > 1) {
                        msg += `${r.originalLine}\n  ${r.feet}\n`;
                    }
                    else msg += r.feet;
                }
                else msg += r.Message;
            });
        }

        else {
            if (data.length > 1)
                msg = "ممکنہ بحور:\n\n";

            data.forEach((r, i) => {
                if (r.feet) {
                    if (data.length > 1) {
                        msg += `  ${i + 1}. ${r.feet}\n`;
                    }
                    else msg += r.feet;
                }
                else msg += r.Message;
            });
        }


        ctx.reply(msg);
    }).catch((err) => {
        console.log(err);
        ctx.reply("تیکنیکی خرابی! دوبارہ کوشش کریں۔");
    });
})


bot.launch();