
function createFinalItems(itemsFullDesc, eqItems){
	var finalItems ={}
    for (var fullItemDescr in itemsFullDesc) {
      for(var bodypart in eqItems){
        if(itemsFullDesc[fullItemDescr].id === eqItems[bodypart].id){
          finalItems[bodypart]  = itemPatern(
            itemsFullDesc[fullItemDescr].id, 
            itemsFullDesc[fullItemDescr].name, 
            itemsFullDesc[fullItemDescr].buyPrice, 
            itemsFullDesc[fullItemDescr].sellPrice, 
            itemsFullDesc[fullItemDescr].requiredLevel
            );
        }
      }
    }
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