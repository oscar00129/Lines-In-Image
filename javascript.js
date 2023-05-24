const app = Vue.createApp({
    data() {
        return {
            numLinesX: 0,
            numLinesY: 0,
            canvas: null,
            context: null,
            image: null,
            colorX: "#FF0000",
            colorY: "#00FF00",
            widthX: 1,
            widthY: 1
        }
    },
    mounted(){
        this.canvas = this.$refs.canvas;
        this.context = this.canvas.getContext('2d');
    },
    methods: {
        handleImageSelect(event) {
            const file = event.target.files[0];

            if (file) {
              const reader = new FileReader();
      
              reader.onload = (e) => {
                this.image = new Image();
                this.image.onload = () => {
                    // Cambiar el tamaño del canvas al de la imagen
                    this.canvas.width = this.image.width;
                    this.canvas.height = this.image.height;

                    // Dibujar la imagen en el canvas
                    this.updateCanvas();

                    // Opcional: Limpiar el input de archivo para permitir seleccionar la misma imagen nuevamente
                    event.target.value = '';
                };
                this.image.src = e.target.result;
              };
      
              reader.readAsDataURL(file);
            }
        },
        updateCanvas() {
            // Validaciones para limitar el numero puesto en los input
            if (this.numLinesX > this.canvas.width) this.numLinesX = this.canvas.width;
            if (this.numLinesY > this.canvas.height) this.numLinesY = this.canvas.height;
            if (this.numLinesX < 0) this.numLinesX = 0;
            if (this.numLinesY < 0) this.numLinesY = 0;
      
            if (!this.image) return;
            
            // Limpiar el canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
            // Dibujar la imagen en el canvas
            this.context.drawImage(this.image, 0, 0);
      
            // Calcular el tamaño de las líneas
            const widthInterval = this.canvas.width / (this.numLinesX + 1);
            const heightInterval = this.canvas.height / (this.numLinesY + 1);

            // Dibujar líneas horizontales
            if (this.numLinesX > 0){
                for (let i = 1; i <= this.numLinesX; i++){
                    this.context.lineWidth = this.widthX;
                    //console.log(i + '" linea puesta en posicion: ' + cadaCuantoPonerLineaX);
                    this.context.beginPath();
                    this.context.moveTo(widthInterval * i, 0);
                    this.context.lineTo(widthInterval * i, this.canvas.height);
                    this.context.strokeStyle = this.colorX;
                    this.context.stroke();
                }
            }

            // Dibujar líneas verticales
            if (this.numLinesY > 0){
                for (let i = 1; i <= this.numLinesY; i++){
                    this.context.lineWidth = this.widthY;
                    this.context.beginPath();
                    this.context.moveTo(0, heightInterval * i);
                    this.context.lineTo(this.canvas.width, heightInterval * i);
                    this.context.strokeStyle = this.colorY;
                    this.context.stroke();
                }
            }
        },
        makeSquares(){
            const a = parseInt(this.canvas.width);
            const b = parseInt(this.canvas.height);
            console.log("width: " + a);
            console.log("height: " + b);
            
            // Función para calcular el máximo común divisor (MCD) utilizando el algoritmo de Euclides
            const calculateGCD = (x, y) => {
                if (y === 0) {
                    return x;
                }
                return calculateGCD(y, x % y);
            };

            // Calcula el MCD utilizando el algoritmo de Euclides
            const gcd = calculateGCD(a, b);
            
            console.log(gcd);
        }
    },
    computed: {
        isSquare(){
            const canvasWidth = this.canvas ? this.canvas.width : 0;
            const canvasHeight = this.canvas ? this.canvas.height : 0;
            if(canvasWidth / this.numLinesX == canvasHeight / this.numLinesY){
                return true;
            }else{
                return false;
            }
            
        }
    }
});

app.mount('#app')