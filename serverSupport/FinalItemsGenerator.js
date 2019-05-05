
function createFinalItems(itemsFullDesc, eqItems){
	var finalItems ={}
	itemsFullDesc.forEach(function(element) {
  					if(element.id === eqItems.data.items.back.id){
  						finalItems.back = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					} else if(element.id === eqItems.data.items.chest.id){
  						finalItems.chest = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					} else if(element.id === eqItems.data.items.feet.id) {
  						finalItems.feet = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					} else if(element.id === eqItems.data.items.finger1.id){
  						finalItems.finger1 = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					}else if(element.id === eqItems.data.items.finger2.id){
  						finalItems.finger2 = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					}else if(element.id === eqItems.data.items.hands.id){
  						finalItems.hands = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					}else if(element.id === eqItems.data.items.head.id){
  						finalItems.head = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					}else if(element.id === eqItems.data.items.legs.id){
  						finalItems.legs = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					}else if(element.id === eqItems.data.items.mainHand.id){
  						finalItems.mainHand = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					}else if(element.id === eqItems.data.items.neck.id){
  						finalItems.neck = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
  					}else if(element.id === eqItems.data.items.shirt.id){
              finalItems.shirt = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
            }else if(element.id === eqItems.data.items.shoulder.id){
              finalItems.shoulder = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
            }else if(element.id === eqItems.data.items.trinket1.id){
              finalItems.trinket1 = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
            }else if(element.id === eqItems.data.items.trinket2.id){
              finalItems.trinket2 = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
            }else if(element.id === eqItems.data.items.waist.id){
              finalItems.waist = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
            }else if(element.id === eqItems.data.items.wrist.id){
              finalItems.wrist = itemPatern(element.id, element.name, element.buyPrice,element.sellPrice,element.requiredLevel);
            }
				});

	return finalItems;
}

function itemPatern(itemID, itemName, itemBuyPrice, itemSellPrice, itemRequiredLevel){
  return {
    id: itemID,
    name: itemName,
    buyPrice: itemBuyPrice,
    sellPrice: itemSellPrice,
    requiredLevel: itemRequiredLevel
  }
}

module.exports.createFinalItems = createFinalItems;