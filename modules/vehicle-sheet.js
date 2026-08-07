export class unisystemVehicleSheet extends ActorSheet {

    /** @override */
      static get defaultOptions() {
        // return mergeObject(super.defaultOptions, {
        return foundry.utils.mergeObject(super.defaultOptions, {
          // classes: ["unisystemcinematicbymmfo", "sheet", "actor", `${game.settings.get("unisystemcinematicbymmfo", "light-mode") ? "light-mode" : ""}`],
          classes: ["unisystemcinematicbymmfo", "sheet", "actor", `${game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "afmbe" ? "afmbe" : (game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "witchcraft" ? "witchcraft" : (game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "terraprimate" ? "terraprimate" : ""))}`],
          template: "systems/unisystemcinematicbymmfo/templates/vehicle-sheet.html",
            width: 700,
            height: 780,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "core"}],
            dragDrop: [{dragSelector: [
            ".item"
            ], 
            dropSelector: null}]
      });
    }
  
    /* -------------------------------------------- */
    /** @override */

  async getData() {
    const  data = super.getData(); 
    data.isGM = game.user.isGM;
    data.editable = data.options.editable;
    const actorData = data.system;
    let options = 0;
    let user = this.user;

    data.descriptionHTML = await TextEditor.enrichHTML(data.actor.system.biography, {
        async: false
      })

    this._prepareCharacterItems(data)

    return data
  }

  _prepareCharacterItems(sheetData) {
      const actorData = sheetData.actor

      // Initialize Containers
      const vehicles = [];
      const item = [];
      const equippedItem = [];
      const weapon = [];

      // Iterate through items and assign to containers
      for (let i of sheetData.items) {
          switch (i.type) {
            case "item": 
                if (i.system.equipped) {equippedItem.push(i)}
                else {item.push(i)}
                break

                case "vehicles": 
                vehicles.push(i)
                break
            
            case "weapon": 
                weapon.push(i)
                break
          }
      }

      // Alphabetically sort all items
      const itemCats = [vehicles, item, equippedItem, weapon]
      for (let category of itemCats) {
          if (category.length > 1) {
              category.sort((a,b) => {
                  let nameA = a.name.toLowerCase()
                  let nameB = b.name.toLowerCase()
                  if (nameA > nameB) {return 1}
                  else {return -1}
              })
          }
      }

      // Assign and return items
      actorData.vehicles = vehicles
      actorData.item = item
      actorData.equippedItem = equippedItem
      actorData.weapon = weapon
  }

  /** @override */
    async activateListeners(html) {
        super.activateListeners(html);

        // Buttons and Event Listeners
        html.find('.damage-roll').click(this._onDamageRoll.bind(this))
        html.find('.toggleEquipped').click(this._onToggleEquipped.bind(this))
        html.find('.armor-button-cell button').click(this._onArmorRoll.bind(this))
        
        // Update/Open Inventory Item
        html.find('.create-item').click(this._createItem.bind(this))

        html.find('.item-name').click( (ev) => {
            const li = ev.currentTarget.closest(".item")
            const item = this.actor.items.get(li.dataset.itemId)
            item.sheet.render(true)
            item.update({"data.value": item.system.value})
        })

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = ev.currentTarget.closest(".item");
            this.actor.deleteEmbeddedDocuments("Item", [li.dataset.itemId]);
        });
    }

    /**
   * Handle clickable rolls.
   * @param event   The originating click event
   * @private
   */

    _createItem(event) {
        event.preventDefault()
        const element = event.currentTarget
        
        let itemData = {
            // name: `New ${element.dataset.create}`,
            name: game.i18n.localize(`UNISYSTEMCINEMATIC.New`)+` `+game.i18n.localize(`UNISYSTEMCINEMATIC.${element.dataset.create}`),
            type: element.dataset.create,
            cost: 0,
            level: 0
        }
        return Item.create(itemData, {parent: this.actor})
    }

    async _onDamageRoll(event) {
        event.preventDefault()
        let element = event.currentTarget
        let weapon = this.actor.items.get(element.closest('.item').dataset.itemId)

        let roll = new Roll(weapon.system.damage)
        await roll.roll()
        await game?.dice3d?.showForRoll(roll)

        // Create Chat Content
        let chatContent = `<div>
                                <h2>${weapon.name}</h2>

                                <table class="unisystemcinematicbymmfo-chat-roll-table">
                                    <thead>
                                        <tr>
                                            <th>`+game.i18n.localize(`UNISYSTEMCINEMATIC.Damage`)+`</th>
                                            <th>`+game.i18n.localize(`UNISYSTEMCINEMATIC.Detail`)+`</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>[[${roll.result}]]</td>
                                            <td>${weapon.system.damage}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>`

        ChatMessage.create({
            /* type: CONST.CHAT_MESSAGE_TYPES.ROLL, */
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: chatContent,
            roll: roll
          })
    }

    async _onArmorRoll(event) {
        event.preventDefault()
        let element = event.currentTarget
        let equippedItem = this.actor.items.get(element.closest('.item').dataset.itemId)

        let roll = new Roll(equippedItem.system.armor_value)
        await roll.roll()
        await game?.dice3d?.showForRoll(roll)

        // Create Chat Content
        let chatContent = `<div>
                                <h2>${equippedItem.name}</h2>

                                <table class="unisystemcinematicbymmfo-chat-roll-table">
                                    <thead>
                                        <tr>
                                            <th>`+game.i18n.localize(`UNISYSTEMCINEMATIC.Result`)+`</th>
                                            <th>`+game.i18n.localize(`UNISYSTEMCINEMATIC.Detail`)+`</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>[[${roll.result}]]</td>
                                            <td>${equippedItem.system.armor_value}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>`

        ChatMessage.create({
            /* type: CONST.CHAT_MESSAGE_TYPES.ROLL, */
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: chatContent,
            roll: roll
          })
    }

    _onToggleEquipped(event) {
        event.preventDefault()
        let element = event.currentTarget
        let equippedItem = this.actor.items.get(element.closest('.item').dataset.itemId)

        switch (equippedItem.system.equipped) {
            case true:
                equippedItem.update({'system.equipped': false})
                break
            
            case false:
                equippedItem.update({'system.equipped': true})
                break
        }
    }


}
