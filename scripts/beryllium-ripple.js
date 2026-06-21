var berylRipple = new ItemTurret("beryllium-ripple");
berylRipple.localizedName = "Beryllium Ripple";
berylRipple.description = "Erekir modification of Ripple. Fires rapid green projectiles using Beryllium.";

berylRipple.requirements = ItemStack.with(
    Items.graphite, 200,
    Items.silicon, 150,
    Items.beryllium, 300
);

berylRipple.category = Category.turret;     
berylRipple.buildVisibility = BuildVisibility.shown;
berylRipple.size = 3;            
berylRipple.health = 2000; 
berylRipple.targetAir = true;    
berylRipple.targetGround = true; 
berylRipple.range = 62 * 8;      
berylRipple.envEnabled = Env.any; 

// --- ВНЕШНИЙ ВИД И ЭРЕКИР-БАЗА ---
berylRipple.drawer = new DrawTurret("reinforced-");
berylRipple.heatColor = Color.valueOf("92dd7e");

// Механика стрельбы от Спектра
var spectre = Blocks.spectre;
berylRipple.inaccuracy = spectre.inaccuracy; 
berylRipple.reload = spectre.reload; 
berylRipple.shoot = spectre.shoot;   
berylRipple.ammoUseEffect = spectre.ammoUseEffect; 

// Патрон Бериллий
var customBeryl = new BasicBulletType(8, 50); 
customBeryl.width = 15;
customBeryl.height = 21;
customBeryl.lifetime = berylRipple.range / customBeryl.speed;
customBeryl.pierce = true;   
customBeryl.pierceCap = 2;   
customBeryl.ammoMultiplier = 4; 
customBeryl.shootEffect = Fx.shootBig;
customBeryl.smokeEffect = Fx.shootBigSmoke;

// Зеленые цвета пули
customBeryl.frontColor = Color.valueOf("92dd7e"); 
customBeryl.backColor = Items.beryllium.color;    

berylRipple.ammoTypes.put(Items.beryllium, customBeryl);

// Добавление в древо Эрекира (после Прорыва/Breach)
Events.on(EventType.ContentInitEvent, cons(e => {
    var parentNode = Blocks.breach.techNode; 
    if (parentNode != null) {
        new TechTree.TechNode(parentNode, berylRipple, berylRipple.researchRequirements());
    }
}));