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

// Усиленная база Эрекира:
berylRipple.drawer = new DrawTurret("reinforced-");
berylRipple.heatColor = Color.valueOf("92dd7e");

// === СИСТЕМА ОХЛАЖДЕНИЯ ===
berylRipple.consumeCoolant(0.5); // Потребляет 30 единиц жидкости в секунду
berylRipple.coolantMultiplier = 2.5; // Дает ровно +250% скорости стрельбы при подаче воды

// Механика стрельбы от Спектра
var spectre = Blocks.spectre;
berylRipple.inaccuracy = spectre.inaccuracy; 
berylRipple.reload = spectre.reload; 
berylRipple.shoot = spectre.shoot;   
berylRipple.ammoUseEffect = spectre.ammoUseEffect; 

// === ПАТРОН 1: БЕРИЛЛИЙ (Базовый) ===
var customBeryl = new BasicBulletType(8, 50); 
customBeryl.width = 15;
customBeryl.height = 21;
customBeryl.lifetime = berylRipple.range / customBeryl.speed;
customBeryl.pierce = true;   
customBeryl.pierceCap = 2;   
customBeryl.ammoMultiplier = 4; 
customBeryl.shootEffect = Fx.shootBig;
customBeryl.smokeEffect = Fx.shootBigSmoke;
customBeryl.frontColor = Color.valueOf("92dd7e"); 
customBeryl.backColor = Items.beryllium.color;    


// === ПАТРОН 2: ВОЛЬФРАМ (Против юнитов, с увеличенной дальностью) ===
var customTungsten = new BasicBulletType(8, 71.25); // Скорость 8, Урон 71.25
customTungsten.width = 15;
customTungsten.height = 21;

// Дальность +5 блоков
customTungsten.rangeChange = 5 * 8; 
// Рассчитываем время жизни так, чтобы пуля долетела до новой границы радиуса
customTungsten.lifetime = (berylRipple.range + customTungsten.rangeChange) / customTungsten.speed;

// Сниженный урон по постройкам (-70%)
customTungsten.buildingDamageMultiplier = 0.3; 

customTungsten.pierce = true;   
customTungsten.pierceCap = 3; // Вольфрам тверже, так что пусть пробивает 3 цели вместо 2!
customTungsten.ammoMultiplier = 4; 
customTungsten.shootEffect = Fx.shootBig;
customTungsten.smokeEffect = Fx.shootBigSmoke;
customTungsten.frontColor = Color.valueOf("a0b0c8"); // Светлый металлический носик
customTungsten.backColor = Items.tungsten.color;     // Тёмный цвет вольфрама для хвоста пули


// Заряжаем оба типа патронов в пушку
berylRipple.ammoTypes.put(Items.beryllium, customBeryl);
berylRipple.ammoTypes.put(Items.tungsten, customTungsten);

// Добавление в древо Эрекира
Events.on(EventType.ContentInitEvent, cons(e => {
    var parentNode = Blocks.diffuse.techNode; 
    if (parentNode != null) {
        new TechTree.TechNode(parentNode, berylRipple, berylRipple.researchRequirements());
    }
}));