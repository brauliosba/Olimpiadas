import * as Phaser from 'phaser';

export class VisualEffectsManager
{
    constructor(scene){
        this.scene = scene
    }

    init(){
       
    }

    CreateNumbersText(number){
        let strNumber = number.toString()
        
        let effectTextContainer = this.scene.add.container(0,0).setDepth(6)
        effectTextContainer.add(this.scene.add.image(0, 0, 'textos', "+.png").setDepth(6))
        for(let i = 0; i<=strNumber.length; i++){
            if(i===strNumber.length){
                let number = this.scene.add.image((i*46)+75, 0, 'textos',  "pts.png").setDepth(6)
                effectTextContainer.add(number)
            }
            else{
                let number = this.scene.add.image((i*46)+46, 0, 'textos', strNumber[i] + ".png").setDepth(6)
                effectTextContainer.add(number)
            }
            
        }
        effectTextContainer.setAlpha(0).setScale(.8)
        this.ShowContainerWithFade(this,200,550, 200, 400, 200, effectTextContainer);
    }
    CreateMessage(messageType){
        let messageContainer = this.scene.add.image(0, 0, 'textos',  messageType + ".png").setDepth(6).setScale(.8)
        this.ShowContainerWithFade(this,300, 450, 200, 400, 200, messageContainer);
    }

    CreateMilestone(message){
        let milestoneContainer = this.scene.add.container(0,0).setDepth(8.3)
        let milestoneText = this.scene.add.text(0, 0, message, { font: '400 200px Bungee', color: '#F5B05F' }).setOrigin(.5).setDepth(8.4).setStroke('#503530', 10);
        milestoneContainer.add(milestoneText)
        this.ShowContainerWithFade(this,this.scene.gameWidth/2, this.scene.gameWidth/2-370, 200, 400, 200, milestoneContainer);
    }

    ShowContainerWithFade(scene, cx,cy, fadeInDuration, displayDuration, fadeOutDuration, container) {
        
        container.x = cx
        container.y =cy
        // Crear el tween para el fade in
        this.scene.tweens.add({
            targets: container,
            alpha: 1, // Opacidad completa
            duration: fadeInDuration,
            onComplete: () => {
                // Después del fade in, esperar el displayDuration y luego hacer fade out
                this.scene.time.delayedCall(displayDuration, () => {
                    this.scene.tweens.add({
                        targets: container,
                        alpha: 0, // Volver a transparente
                        duration: fadeOutDuration,
                        onComplete: () => {
                            // Destruir el contenedor después del fade out
                            container.destroy();
                        }
                    });
                });
            }
        });
    }
}