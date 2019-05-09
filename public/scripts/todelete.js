    //apply bonus
    var oldValue;
    var newValue;
    finalItems[key].bonus.forEach(function(bonus){ 
      oldValue = Number($(`.${bonus.stat}`).text());
      newValue = oldValue + bonus.amount;
      $(`.${bonus.stat}`).text(newValue);
      $(`.${bonus.stat}`).addClass("bonus");
    });