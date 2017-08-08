/**
 * Created by 2015 on 2017/8/8.
 */

window.onload = function () {


  var bgModule = {
    width: 0,
    height: 0,
    mainBg: null,
    ctx: null,
    stars: [],
    starsCount: 800,
    init: function () {         // 初始化

      // 绑定控件
      var _this = this;
      this.mainBg = document.querySelector('.bg');
      this.ctx = this.mainBg.getContext('2d');
      this.adjustSize();

      // 生成星星
      for(var i = 0; i < this.starsCount; i++) {
        var star = new Star();
        this.stars.push(star);
      }

      // 绘制画布上的内容
      setInterval(function () {

        // 擦出原来的背景
        _this.ctx.clearRect(0, 0, _this.width, _this.height);

        // 绘制星星
        for(var i = 0; i < _this.stars.length; i++) {
          _this.stars[i].draw();
        }
      }, 1000 / 60);

      // 绑定窗口改变大小事件
      window.addEventListener('resize', function () {
        _this.adjustSize();
      }, false);

      // 星星构造函数
      function Star() {

        var that = this;

        (function () {
          init();
        })();

        function init() {
          that.pos = {};                              // 坐标
          that.pos.x = Math.random() * _this.width;   // 横坐标
          that.pos.y = _this.height * Math.random();  // 纵坐标
          that.alpha = 0.05 + Math.random() * 0.3;    // 透明度
          that.scale = 0.08 + Math.random() * 0.3;    // 缩放大小
          that.velocity = 0.3 + Math.random();        // 速度

        }

        this.draw = function() {

          // 当星星的透明度小于0 或者 y轴坐标小于0（超出屏幕范围）时，需要重新初始化各参数
          if(that.alpha <= 0 || that.pos.y <= 0) {
            init();
          }

          that.pos.y -= that.velocity;
          that.alpha -= 0.0005;
          _this.ctx.beginPath();
          _this.ctx.arc(that.pos.x, that.pos.y, that.scale*10, 0, 2 * Math.PI, false);
          _this.ctx.fillStyle = 'rgba(255,99,71,' + that.alpha + ')';
          _this.ctx.fill();
          _this.ctx.closePath();
        };
      }
    },
    adjustSize: function () {   // 调整画布大小，自适应窗口大小

      // 重新计算窗口大小
      this.width = document.body.clientWidth - 5;
      this.height = document.body.clientHeight - 5;

      // 更新画布大小
      this.mainBg.width = this.width;
      this.mainBg.height = this.height;
    }
  };

  bgModule.init();

};

