const Discord = require('Discord.js');
const Bot = new Discord.Client();
const Prefix = "."
const hey = require("./Commands/hey.js");

// Connection part : set game + console log

Bot.on('ready', function(){

    const Dev = " my devloppement :)";

    Bot.user.setPresence({ game: { name: Dev, type: "WATCHING"} }).then(console.log('Activity set to "' + Dev + '"'));

    console.log(`Bot ready and their name is : "${Bot.user.tag}"`);
});

// New member : Set role + quiz

Bot.on('guildMemberAdd', New => {

    /* 
    
    A faire : Questionnaire de bienvenue concernant :
    -langue
    -âge
    
    
    */
});


Bot.on('message', message => {

    

    if(message.content == Prefix + "installation"){

        /*            {
                        "name": "Le niveau de votre vérification :",
                        "value": "Vous souhaitez comme vérification : \n  :zero: : Aucune vérification \n :one: : Une réaction a un message \n :two: : Des réponses a un mini questionnaires ",
                      }
        */
        
        
    message.guild.createChannel('configuration', 'text').then(newChannel => { newChannel.send({
        embed: {
            "title": "Welcome",
              "description": "Welcome to the configuration part of the bot \"The Want4d Bot\", start by choosing your language by clicking on your flag",
              "author": {
                "name": "Akitsuna#1546",
                "icon_url": "https://cdn.discordapp.com/attachments/522571959729389582/526009582959460354/Profile.jpg"
              },
              "color": 0,
              "thumbnail": "https://cdn.discordapp.com/attachments/527237610134044672/527237863021215795/shutterstock-531875605-software-engineering-article_0.jpg",
              "image": "https://cdn.discordapp.com/attachments/522571959729389582/526018163503136770/giphy.gif"
        }}).then( m => {
        m.react('🇫🇷'),
        m.react('🇩🇪'),
        m.react('🇬🇧'),
        m.react('🇪🇸'),
        track = m.createReactionCollector((r, u) => u.id === message.author.id),
        track.on('collect', r => {

            var langue;
            var FR = "Français";
            var DE = "Allemand";
            var ES = "Espagnol";
            var EN = "Anglais";

            if (r.emoji.name ===  "🇫🇷"){
                newChannel.bulkDelete(1);
                langue = FR;
            } 

            if (r.emoji.name ===  "🇩🇪"){
                newChannel.bulkDelete(1);
                langue = DE;
                Title = "Bot-Konfiguration";
                Description = "Dieser Teil ist der Konfiguration des Bots gewidmet"
            } 

            if (r.emoji.name ===  "🇬🇧"){
                newChannel.bulkDelete(1);
                langue = EN;
                Title = "Bot Configuration";
                Description = "This part is dedicated to the configuration of the bot"
            } 

            if (r.emoji.name ===  "🇪🇸"){
                newChannel.bulkDelete(1);
                langue = ES;
                Title = "Configuración del bot";
                Description = "Esta parte está dedicada a la configuración del bot"
            }
                if(langue === FR){
                    newChannel.send("Très bien, vous avez choisi le " + langue + " en langue principale, passons a la configuration").then(newChannel.send({
                        embed: {
                            "title": "Configuration du bot",
                            "description":"Cette partie est dédiée a la configuration du bot",
                            "color": 0,
                            "thumbnail": {
                              "url": "https://cdn.discordapp.com/attachments/527237610134044672/527237863021215795/shutterstock-531875605-software-engineering-article_0.jpg"
                            },
                            "author": {
                              "name": "Akitsuna#1546",
                              "icon_url": "https://cdn.discordapp.com/attachments/522571959729389582/526009582959460354/Profile.jpg"
                            },
                            "fields": [
                              {
                                "name": "Fonctionnement :",
                                "value": "Donnez votre choix en réagissant a ce message, puis validez en réagissant avec ✅ \n "
                              },
                              {
                                "name": "Orientation",
                                "value": "Votre serveur est plus orienté sur : \n Le gaming : 🕹️      \nL'information : ⚠️      \n Le sport : 🎳       \nLes giveaways : 🎉"
                              },
                            ]
                          }}).then(ms => {
                              ms.react('🕹'),
                              ms.react('⚠'),
                              ms.react('🎳'),
                              ms.react('🎉'),
                              ms.react('✅')
                              EmojiT = ms.createReactionCollector((a, b) => b.id === message.author.id)

                              var Orientation;
                              var OrientationS;
                              var Gaming = "le Gaming";
                              var Information = "l'Information";
                              var Sport = "le Sport";
                              var GiveAways = "les GiveAways";

                              EmojiT.on('collect', e => {

                                  if(e.emoji.name === '🕹'){
                                      Orientation = Gaming;
                                      OrientationS = "undefined"
                                  }

                                  if(e.emoji.name === '⚠' && Orientation == Gaming){
                                      OrientationS = Information
                                      Orientation = Gaming
                                  }

                                  if(e.emoji.name === '✅'){
                                      if(OrientationS == "undefined") {
                                        newChannel.send("Vous avez choisi " + Orientation + " comme orientation, passons a la vérification")
                                  }
                                    if(OrientationS != "undefined" ){
                                        newChannel.send("Vous avez choisi " + Orientation + " comme orientation principale et " + OrientationS + " comme orientation secondaire, passons a la vérification")
                                    }
                                }

                                  
                              })

                          }))
                }

                if(langue === DE){
                    newChannel.send("Sehr gut, Sie haben "+ langue +" in der Hauptsprache gewählt, gehen wir zur Konfiguration").then(newChannel.send(" ", {Orientation}))
                }

                if(langue === EN){
                    newChannel.send("Very good, you chose the "+ langue +" in the main language, let's go to the configuration").then(newChannel.send(" ", {Orientation}))
                }
                if(langue === ES){
                    newChannel.send("Muy bien, eligió "+ langue +" en el idioma principal, vamos a la configuración").then(newChannel.send(" ", {Orientation}))
                    }
                })})})};

    if(message.content == Prefix + "desinstallation") {;
        message.guild.channels.find(channel => channel.name === 'configuration').delete();
    }

});

Bot.login(proccess.env.TOKEN);
