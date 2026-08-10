// Import Modules
import { unisystemActorSheet } from "./actor-sheet.js";
import { unisystemActor } from "./actor.js";
import { unisystemItem } from "./item.js";
import { unisystemItemSheet } from "./item-sheet.js";
import { unisystemCellSheet } from "./cell-sheet.js"
import { unisystemCreatureSheet } from "./creature-sheet.js"
import { unisystemVehicleSheet } from "./vehicle-sheet.js"
import { registerHandlebarsHelpers } from "./helpers.js";

import { unisystemMessage } from "./chat-message.js";



/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function() {
    console.log(`Initializing UNISYSTEMCINEMATIC System`);

    /**
	 * Set an initiative formula for the system
	 * @type {String}
	 */
	CONFIG.Combat.initiative = {
        formula: "1d10 + @initiative.value",
        decimals: 0
      };

      
      // Register Handlebars Helpers
      registerHandlebarsHelpers();


      // Define Custom Entity Classes
      CONFIG.Actor.documentClass = unisystemActor
      CONFIG.Item.documentClass = unisystemItem

      CONFIG.ChatMessage.documentClass = unisystemMessage;

      // Register sheet application classes
      Actors.unregisterSheet("core", ActorSheet)

      Actors.registerSheet("unisystemcinematicbymmfo", unisystemActorSheet, 
      {
          types: ["character"],
          makeDefault: true,
          label: "Default UNISYSTEMCINEMATIC Character Sheet"
      })

      Actors.registerSheet("unisystemcinematicbymmfo", unisystemCreatureSheet, 
      {
          types: ["creature"],
          makeDefault: true,
          label: "Default UNISYSTEMCINEMATIC Creature Sheet"
      })

      Actors.registerSheet("unisystemcinematicbymmfo", unisystemCellSheet, 
      {
          types: ["cell"],
          makeDefault: true,
          label: "Default UNISYSTEMCINEMATIC Cell Sheet"
      })

      Actors.registerSheet("unisystemcinematicbymmfo", unisystemVehicleSheet, 
      {
          types: ["vehicle"],
          makeDefault: true,
          label: "Default UNISYSTEMCINEMATIC Vehicle Sheet"
      })

      Items.registerSheet("unisystemcinematicbymmfo", unisystemItemSheet, 
      {
          makeDefault: true,
          label: "Default UNISYSTEMCINEMATIC Item Sheet"
      })


      // Game Settings
      function delayedReload() {window.setTimeout(() => location.reload(), 500)}
      /*
      game.settings.register("unisystemcinematicbymmfo", "light-mode", {
        name: game.i18n.localize("UNISYSTEMCINEMATIC.Light Mode"),
        hint: game.i18n.localize("UNISYSTEMCINEMATIC.Checking this option enables Light Mode"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: delayedReload
      });
      */

        game.settings.register("unisystemcinematicbymmfo", "gamesystem", {
        name: game.i18n.localize("UNISYSTEMCINEMATIC.Settings.gamesystem.name"),
        hint: game.i18n.localize("UNISYSTEMCINEMATIC.Settings.gamesystem.hint"),
        scope: "world",
        config: true,
        default: "buffy",
        type: String,
        choices: {
          buffy: "UNISYSTEMCINEMATIC.Settings.gamesystem.buffy",
          angel: "UNISYSTEMCINEMATIC.Settings.gamesystem.angel",
          armyofdarkness: "UNISYSTEMCINEMATIC.Settings.gamesystem.armyofdarkness",
          cityofheroes: "UNISYSTEMCINEMATIC.Settings.gamesystem.cityofheroes",
          ghostsofalbion: "UNISYSTEMCINEMATIC.Settings.gamesystem.ghostsofalbion",
          eldritchskies: "UNISYSTEMCINEMATIC.Settings.gamesystem.eldritchskies",
        },
        requiresReload: true,
      });

      game.settings.register("unisystemcinematicbymmfo", "aegis-ndd", {
          name: game.i18n.localize("UNISYSTEMCINEMATIC.Aegis-NDD"),
          hint: game.i18n.localize("UNISYSTEMCINEMATIC.Checking this option enables NDD wheel instead of Aegis wheel"),
          scope: "world",
          config: true,
          default: false,
          type: Boolean,
          onChange: delayedReload
      });

      const gamesystem = game.settings.get("unisystemcinematicbymmfo", "gamesystem");
      const ndd = game.settings.get("unisystemcinematicbymmfo", "aegis-ndd");
      if (gamesystem === "conx") {
        document.body.classList.add(ndd ? "unisystemcinematicbymmfo-ndd" : "unisystemcinematicbymmfo-aegis");
      }
      else {
        document.body.classList.add(gamesystem);  
      }

      game.settings.register("unisystemcinematicbymmfo", "polaroidold", {
        name: game.i18n.localize("UNISYSTEMCINEMATIC.Polaroid Old"),
        hint: game.i18n.localize("UNISYSTEMCINEMATIC.Checking this option enables Old Polaroid"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: delayedReload
      });

})


/**
 * Adds custom dice to Dice So Nice!.
 */
Hooks.once("diceSoNiceReady", (dice3d) => {
  // Called once the module is ready to listen to new rolls and display 3D animations.
  // dice3d: Main class, instantiated and ready to use.

  /**
   * Add a colorset (theme)
   * @param {Object} colorset (see below)
   * @param {string} mode= "default","preferred"
   * The "mode" parameter have 2 modes :
   * - "default" only register the colorset
   * - "preferred" apply the colorset if the player didn't already change his dice appearance for this world.
   */
  dice3d.addColorset(
    {
      name: "unisystemb",
      description: "Conspiracy X/B",
      category: "Conspiracy X",
      foreground: "#ffffff",
      background: "#000000",
      edge: "#000000",
      font: "Industria",
    },
    "preferred",
  )
  dice3d.addColorset(
    {
      name: "unisystemw",
      description: "Conspiracy X/W",
      category: "Conspiracy X",
      foreground: "#000000",
      background: "#ffffff",
      edge: "#ffffff",
      font: "Industria",
    },
    "default",
  )

  dice3d.addSystem({ id: "unisystemetw", name: "White E.T." }, "preferred");
  dice3d.addDicePreset({
    type: "d10",
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "systems/unisystemcinematicbymmfo/images/avatars/ET_white.png",
    ],
    system: "unisystemetw",
  },
"d10");

  dice3d.addSystem({ id: "unisystemetb", name: "Black E.T." }, "default");
  dice3d.addDicePreset({
    type: "d10",
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "systems/unisystemcinematicbymmfo/images/avatars/ET_black.png",
    ],
    system: "unisystemetb",
  },
"d10");

});



/* -------------------------------------------- */
/*  Chat Message Hooks                          */
/* -------------------------------------------- */

// Hook for Re-Rolls on Lucky/Unlucky Rolls
Hooks.on("renderChatMessage", (app, html, data) => {
    let chatButton = html[0].querySelector("[data-roll='roll-again']")

    if (chatButton != undefined && chatButton != null) {
        chatButton.addEventListener('click', async () => {
            let ruleTag = ''

            if (html[0].querySelector("[data-roll='dice-result']").textContent == 10) {ruleTag = game.i18n.localize("UNISYSTEMCINEMATIC.Rule of Ten Re-Roll")}
            if (html[0].querySelector("[data-roll='dice-result']").textContent == 1)  {ruleTag = game.i18n.localize("UNISYSTEMCINEMATIC.Rule of One Re-Roll")}

            let roll = new Roll('1d10')
            await roll.roll()
            await game?.dice3d?.showForRoll(roll)

            // Grab and Set Values from Previous Roll
            let attributeLabel = html[0].querySelector('h2').outerHTML
            let diceTotal = Number(html[0].querySelector("[data-roll='dice-total']").textContent)
            let rollMod = Number(html[0].querySelector("[data-roll='modifier']").textContent)
            let ruleOfMod = ruleTag === game.i18n.localize("UNISYSTEMCINEMATIC.Rule of Ten Re-Roll") ? Number(roll.result) > 5 ? Number(roll.result) - 5 : 0 : Number(roll.result) > 4 ? 0 : Number(roll.result) - 5
            if (ruleTag === game.i18n.localize("UNISYSTEMCINEMATIC.Rule of One Re-Roll") && diceTotal == 1 && ruleOfMod < 0) {ruleOfMod--}
            let ruleOfDiv = ''

            if (roll.result == 10 && ruleTag === game.i18n.localize("UNISYSTEMCINEMATIC.Rule of Ten Re-Roll")) {
                ruleOfDiv = `<h2 class="rule-of-chat-text">`+game.i18n.localize("UNISYSTEMCINEMATIC.Rule of 10!")+`</h2>
                            <button type="button" data-roll="roll-again" class="rule-of-ten">`+game.i18n.localize(`UNISYSTEMCINEMATIC.Roll Again`)+`</button>`
                ruleOfMod = 5
            }
            
            if (roll.result == 1 && ruleTag === game.i18n.localize("UNISYSTEMCINEMATIC.Rule of One Re-Roll")) {
                ruleOfDiv = `<h2 class="rule-of-chat-text">`+game.i18n.localize("UNISYSTEMCINEMATIC.Rule of 1!")+`</h2>
                            <button type="button" data-roll="roll-again" class="rule-of-one">`+game.i18n.localize(`UNISYSTEMCINEMATIC.Roll Again`)+`</button>`
                ruleOfMod = -5
                if (diceTotal == 1) {ruleOfMod--}
            }

            // Create Chat Content
            let tags = [`<div>${ruleTag}</div>`]
            let chatContent = `<form>
                                    ${attributeLabel}

                                    <table class="unisystemcinematicbymmfo-chat-roll-table">
                                        <thead>
                                            <tr>
                                                <th class="w30pc">`+game.i18n.localize(`UNISYSTEMCINEMATIC.Roll`)+`</th>
                                                <th class="w30pc">`+game.i18n.localize(`UNISYSTEMCINEMATIC.Modifier2`)+`</th>
                                                <th class="plus">+</th>
                                                <th class="w30pc">`+game.i18n.localize(`UNISYSTEMCINEMATIC.Result2`)+`</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="w30pc" data-roll="dice-result">[[${roll.result}]]</td>
                                                <td class="w30pc" data-roll="modifier">${rollMod}</td>
                                                <td class="plus">+</td>
                                                <td class="w30pc" data-roll="dice-total">${diceTotal + ruleOfMod}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;">
                                        ${ruleOfDiv}
                                    </div>
                                </form>`

            ChatMessage.create({
                /* type: CONST.CHAT_MESSAGE_TYPES.ROLL, */
                user: game.user.id,
                speaker: ChatMessage.getSpeaker(),
                flavor: `<div class="unisystemcinematicbymmfo-tags-flex-container">${tags.join('')}</div>`,
                content: chatContent,
                roll: roll
            })
        })
    }
})