var ripple2 = new ItemTurret("ripple-2");
ripple2.localizedName = "Ultimate Ripple";
ripple2.description = "Ultimate modification of Ripple, increased firing radius and speed.";

ripple2.requirements = ItemStack.with(
    Items.copper, 1300,
    Items.silicon, 600,
    Items.plastanium, 400,
    Items.graphite, 400,
    Items.titanium, 400
);

ripple2.category = Category.turret;     
ripple2.buildVisibility = BuildVisibility.shown;
ripple2.size = 3;            
ripple2.health = 2500;       
ripple2.targetAir = true;    
ripple2.targetGround = true; 
ripple2.range = 62 * 8;      
ripple2.buildCostMultiplier = 0.4;
ripple2.heatColor = Color.purple;

// Настройка системы охлаждения
ripple2.consumeCoolant(0.5); 
ripple2.coolantMultiplier = 1.2; 

var spectre = Blocks.spectre;
ripple2.inaccuracy = spectre.inaccuracy; 
ripple2.reload = spectre.reload; 
ripple2.shoot = spectre.shoot;   
ripple2.ammoUseEffect = spectre.ammoUseEffect; 

// --- ПАТРОН 1: ГРАФИТ
var customSpectre = new BasicBulletType(8, 50); 
customSpectre.width = 15;
customSpectre.height = 21;
customSpectre.lifetime = ripple2.range / customSpectre.speed;
customSpectre.pierce = true;   
customSpectre.pierceCap = 2;   
customSpectre.ammoMultiplier = 4; 
customSpectre.shootEffect = Fx.shootBig;
customSpectre.smokeEffect = Fx.shootBigSmoke;

// --- ПАТРОН 2: СПЛАВ
var customLaser = extend(ContinuousLaserBulletType, 90, {
    update(b) {
        this.super$update(b);
        if (b != undefined && b.owner != null) {
            b.rotation(b.owner.rotation);
        }
    }
});
customLaser.length = ripple2.range; 
customLaser.lifetime = 150; 
customLaser.reloadMultiplier = 0.035; 

// --- ПАТРОН 3: ПЛАСТАН
var customPlast = new ArtilleryBulletType(3.5, 0); 
customPlast.sprite = "shell";
customPlast.splashDamage = 90;
customPlast.splashDamageRadius = 3.7 * 8; 
customPlast.ammoMultiplier = 2;
customPlast.knockback = 1;
customPlast.lifetime = ripple2.range / customPlast.speed;
customPlast.width = 14;
customPlast.height = 14;
customPlast.frontColor = Items.plastanium.color;
customPlast.backColor = Items.plastanium.color;

// Осколки
var plastFrag = new BasicBulletType(2.5, 12);
plastFrag.sprite = "bullet";
plastFrag.width = 10;
plastFrag.height = 12;
plastFrag.lifetime = 25;
plastFrag.frontColor = Items.plastanium.color;
plastFrag.backColor = Items.plastanium.color;
customPlast.fragBullets = 15;
customPlast.fragBullet = plastFrag;

// --- ПАТРОН 4: ВЗРЫВЧАТАЯ СМЕСЬ
var customBlast = new ArtilleryBulletType(3.5, 0);
customBlast.sprite = "shell";
customBlast.splashDamage = 90;
customBlast.splashDamageRadius = 4.6 * 8; 
customBlast.ammoMultiplier = 4;
customBlast.knockback = 0.8;
customBlast.status = StatusEffects.blasted;
customBlast.lifetime = ripple2.range / customBlast.speed;
customBlast.width = 16;
customBlast.height = 16;
customBlast.shootEffect = Fx.shootBig;
customBlast.frontColor = Items.blastCompound.color;
customBlast.backColor = Items.blastCompound.color;

// --- ПАТРОН 5: ПИРОТИТ--
var customPyra = new ArtilleryBulletType(3.5, 0);
customPyra.sprite = "shell";
customPyra.splashDamage = 90;
customPyra.splashDamageRadius = 2.8 * 8; 
customPyra.ammoMultiplier = 4;
customPyra.knockback = 0.8;
customPyra.status = StatusEffects.burning;
customPyra.statusDuration = 12 * 60; 
customPyra.makeFire = true; 
customPyra.lifetime = ripple2.range / customPyra.speed;
customPyra.width = 14;
customPyra.height = 14;
customPyra.frontColor = Items.pyratite.color;
customPyra.backColor = Items.pyratite.color;


ripple2.ammoTypes.put(Items.graphite, customSpectre);   
ripple2.ammoTypes.put(Items.surgeAlloy, customLaser);
ripple2.ammoTypes.put(Items.plastanium, customPlast);
ripple2.ammoTypes.put(Items.blastCompound, customBlast);
ripple2.ammoTypes.put(Items.pyratite, customPyra);


Events.on(EventType.ContentInitEvent, cons(e => {
    var parentNode = Blocks.ripple.techNode;
    if (parentNode != null) {
        new TechTree.TechNode(parentNode, ripple2, ripple2.researchRequirements());
    }
}));