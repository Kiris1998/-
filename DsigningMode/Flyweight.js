//享元模式
// 常见的  我们的享元模式使用就在分页显示上
// 我们知道dom的创建，插入，渲染是十分消耗资源的
// 所以如果我们采用一口气创建dom元素的方法再选择显示的方法，这种代价就非常大
// 我们知道一个页面显示的元素个数是固定的，所以当我们一开始把单个页面需要的dom个数创建出来，
// 随着页码的不同，更改dom中的内容，实现翻页功能。
// 这种共用dom元素的模式，就是享元模式

let Flyweight = function() {
  let created = []
  function create () {
    let dom = document.createElement('div')
    document.getElementById('container').appendChild(dom)
    created.push(dom)
    return dom
  }
  return {
    getDiv(){   // 实现享元模式的关键代码   自始至终都只使用这5个dom元素
      if(created.length < 5) return create()
      else {
        let div = created.shift
        created.push(div)
        return div
      }
    }
  }
}
let article = []
let page = 0,
    num = 5,
    len = article.length
for(let i = 0;i < 5;i++) {
  if(article[i]){
    Flyweight.getDiv().innerHTML = article[i]
  }
} // 初始化这5个元素
