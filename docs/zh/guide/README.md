# 快速上手

## 基本介紹
Luckysheet ，一款純前端類似excel的在線表格，功能強大、配置簡單、完全開源。

## Demo
[在線demo](https://mengshukeji.github.io/LuckysheetDemo/)

![演示](/LuckysheetDocs/img/LuckysheetDemo.gif)

## 在線案例

- [協同編輯Demo](http://luckysheet.lashuju.com/demo/)

## 特性

### 🛠️格式設置
+ **樣式** (修改字體樣式，字號，顏色或者其他通用的樣式)
+ **條件格式** (突出顯示所關注的單元格或單元格區域；強調異常值；使用數據欄、色階和圖標集（與數據中的特定變體對應）直觀地顯示數據)
+ **文本對齊及旋轉** 
+ **支持文本的截斷、溢出、自動換行** 
+ **數據類型** 
	+ **貨幣, 百分比, 數字, 日期** 
	+ **Custom** (和excel保持一致，例如： `##,###0.00` , `$1,234.56$##,###0.00_);[Red]($##,###0.00)`, `_($* ##,###0.00_);_(...($* "-"_);_(@_)`, `08-05 PM 01:30MM-dd AM/PM hh:mm` )
+ **單元格內多樣式** (Alt+Enter單元格內換行、上標、下標、單元格內可定義每個文字的不同樣式)

### 🧬單元格
+ **拖拽選取來修改單元格** (對選區進行操作，可以拖動四邊來移動選區，也可以在右下角對選區進行下拉填充操作)
+ **選區下拉填充** (對於一個1,2,3,4,5的序列，將會按照間隔為1進行下拉填充，而對2,4,6,8將會以2作為間隔。支持等差數列，等比數列，日期，周，天，月，年，中文數字填充)
+ **自動填充選項** (下拉填充後，會出現填充選項的選單，支持選擇覆制，序列，僅格式，只填充格式，天，月，年的選擇)
+ **多選區操作** (可以按住Ctrl鍵進行單元格多選操作，支持多選區的覆制粘貼)
+ **查找和替換** (對內容進行查找替換，支持正則表達式，整詞，大小寫敏感)
+ **定位** (可以根據單元格的數據類型進行自動定位並選中，選中後可以批量進行格式等操作)
+ **合併單元格**
+ **數據驗證(表單功能)**  (支持Checkbox, drop-down list, datePicker)

### 🖱️行和列操作
+ **隱藏，插入，刪除行或列** 
+ **凍結行或列** (支持凍結首行和首列，凍結到選區，凍結調節桿可以進行拖動操作)
+ **文本分列** (可以把文本根據不同符號進行拆分，和excel的分列功能類似)

### 🔨操作體驗
+ **撤銷/重做**
+ **覆制/粘貼/剪切操作** (支持Luckysheet到excel和excel到Luckysheet帶格式的互相拷貝)
+ **快捷鍵支持** (快捷鍵操作保持與excel一致，如果有不同或者缺失請反饋給我們)
+ **格式刷** (與google sheet類似)
+ **任意選區拖拽** (選擇單元格，輸入公式，插入圖表，會與選區相關，可以通過任意拖動和放大縮小選區來改變與之關聯的參數)

### ⚙️公式和函數
+ **內置公式**
	+ 數學 (SUMIFS, AVERAGEIFS, SUMIF, SUM, etc.)
	+ 文本 (CONCATENATE, REGEXMATCH, MID)
	+ 日期 (DATEVALUE, DATEDIF, NOW, WEEKDAY, etc.)
	+ 財務 (PV, FV, IRR, NPV, etc.)
	+ 邏輯 (IF, AND, OR, IFERROR, etc.)
	+ 查找和引用 (VLOOKUP, HLOOkUP, INDIRECT, OFFSET, etc.)
	+ 動態數組 (Excel2019新函數，SORT,FILTER,UNIQUE,RANDARRAY,SEQUENCE)
+ **公式支持數組** (={1,2,3,4,5,6}, Crtl+Shift+Enter)
+ **遠程公式** (DM_TEXT_TFIDF, DM_TEXT_TEXTRANK,DATA_CN_STOCK_CLOSE etc. Need remote interface, can realize complex calculation)
+ **自定義公式**  (根據身份證識別年齡，性別，生日，省份，城市等. AGE_BY_IDCARD, SEX_BY_IDCARD, BIRTHDAY_BY_IDCARD, PROVINCE_BY_IDCARD, CITY_BY_IDCARD, etc. 可以任意加入自己的公式哦)

### 📐表格操作
+ **篩選** (支持顏色、數字、字符、日期的篩選)
+ **排序** (同時加入多個字段進行排序)

### 📈數據透視表
+ **字段拖拽** (操作方式與excel類似，拖動字段到行、列、數值、篩選等4個區域)
+ **聚合方式**  (支持匯總、計數、去重計數、平均、最大、最小、中位數、協方差、標準差、方差等計算)
+ **篩選數據** (可對字段進行篩選後再進行匯總)
+ **數據透視表下鉆** (雙擊數據透視表中的數據，可以下鉆查看到明細，操作方式與excel一致)
+ **根據數據透視表新建圖表** (數據透視表產生的數據也可以進行圖表的制作)

### 📊圖表
+ **支持的圖表類型** (目前折線圖、柱狀圖、面積圖、條形圖、餅圖可以使用，散點圖、雷達圖、儀表盤、漏鬥圖正在接入，其他圖表正在陸續開發中，請大家給予建議) 
+ **關於圖表插件**  (圖表使用了一個中間插件[ChartMix](https://github.com/mengshukeji/chartMix)(MIT協議): 目前支持ECharts，正在逐步接入Highcharts、阿里G2、amCharts、googleChart、chart.js)
+ **Sparklines小圖** (以公式的形式進行設置和展示，目前支持：折線圖、面積圖、柱狀圖、累積圖、條形圖、離散圖、三態圖、餅圖、箱線圖等)

### ✍️分享及寫作
+ **評論** (評論的刪除、添加、修改、隱藏)
+ **共享編輯** (支持多用戶共享編輯，內置API)

### 📚插入對象
+ **插入圖片** (支持JPG,PNG,SVG的插入、修改和刪除，並且隨表格的變動而產生變化)

### ⚡Luckysheet專有
+ **矩陣計算** (通過右鍵選單進行支持：對選區內的數據進行轉置、旋轉、數值計算)
+ **截圖** (把選區的內容進行截圖展示)
+ **覆制到其他格式** (右鍵選單的"覆制為", 支持覆制為json、array、對角線數據、去重等)
+ **EXCEL導入及導出** (專為Luckysheet打造的導入導出插件，支持密碼、水印、公式等的本地導入導出，導出正在開發)

### ⏱️未來開發計劃
+ **打印及設置** (像excel一樣進行打印設置，並導出為圖片或者PDF)
+ **樹形選單** (類似excel中的分級顯示（分組）)
+ **表格新功能** (類似excel中表格的篩選器和切片器)
+ **CSV,TXT導入及導出** (專為Luckysheet打造的導入導出插件，支持密碼、水印、公式等的本地導入導出)
+ **插入svg形狀** (支持[Pen tool](https://github.com/mengshukeji/Pentool)的插入、修改和刪除，並且隨表格的變動而產生變化)
+ **文檔** (完善文檔和API)
+ **敬請期待...** (可以提出好的建議給我們)

## 開發模式

### 環境
[Node.js](https://nodejs.org/en/) Version >= 6 

### 安裝
```shell
npm install
npm install gulp -g
```

### 開發
```shell
npm run dev
```

### 打包
```shell
npm run build
```

## 使用步驟

### 第一步
引入依賴，有2種方式

#### CDN
```html
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"></script>
```

注意，`https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js`這個路徑意思是會拉取到最新的luckysheet代碼，但是如果Luckysheet剛剛發布，jsdelivr網站可能還沒來得及從npm上同步過去，故而使用這個路徑還是會拉到上一個版本，我們推薦您直接指定最新版本。

想要指定Luckysheet版本，請在所有的CDN依賴文件後面加上版本號，如：`https://cdn.jsdelivr.net/npm/luckysheet@2.1.12/dist/luckysheet.umd.js`。

> 如何知道最新版本是哪一版？查看最新 [release記錄](https://github.com/mengshukeji/Luckysheet/releases) 或者 [package.json](https://github.com/mengshukeji/Luckysheet/blob/master/package.json) 的`version`字段。

如果不方便訪問 jsdelivr.net，還可以采用本地方式引入

#### 本地引入

`npm run build`後`dist`文件夾下的所有文件覆制到項目目錄，然後通過相對路徑引入

```html
<link rel='stylesheet' href='./plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='./plugins/plugins.css' />
<link rel='stylesheet' href='./css/luckysheet.css' />
<link rel='stylesheet' href='./assets/iconfont/iconfont.css' />
<script src="./plugins/js/plugin.js"></script>
<script src="./luckysheet.umd.js"></script>
```
### 第二步
指定一個表格容器
```html
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### 第三步
創建一個表格
```javascript
<script>
    $(function () {
        //配置項
        var options = {
            container: 'luckysheet' //luckysheet為容器id
        }
        luckysheet.create(options)
    })
</script>
```

## 整體結構

### 格式

一個完整的Luckysheet表格文件的數據格式為：luckysheetfile，一個表格文件包含若幹個sheet文件，對應excel的sheet0、sheet1等。

一個Luckysheet文件的示例如下，該表格包含3個sheet：`
luckysheetfile = [ {sheet1設置},  {sheet2設置},  {sheet3設置} ]`
相當於excel的3個sheet

![excel sheet](/LuckysheetDocs/img/excel.png)

文件中的一個sheet的數據`luckysheetfile[0]`的結構如下：
```json
{
	"name": "Cell", //工作表名稱
	"color": "", //工作表顏色
	"index": "0", //工作表索引
	"status": "1", //激活狀態
	"order": "0", //工作表的順序
	"hide": 0,//是否隱藏
	"row": 36, //行數
	"column": 18, //列數
	"config": {
		"merge":{}, //合併單元格
		"rowlen":{}, //表格行高
		"columnlen":{}, //表格列寬
		"rowhidden":{}, //隱藏行
		"colhidden":{}, //隱藏列
		"borderInfo":{}, //邊框
	},
	"celldata": [], //初始化使用的單元格數據
	"data": [], //更新和存儲使用的單元格數據
	"scrollLeft": 0, //左右滾動條位置
	"scrollTop": 315, //上下滾動條位置
	"luckysheet_select_save": [], //選中的區域
	"luckysheet_conditionformat_save": {},//條件格式
	"calcChain": [],//公式鏈
	"isPivotTable":false,//是否數據透視表
	"pivotTable":{},//數據透視表設置
	"filter_select": {},//篩選範圍
	"filter": null,//篩選配置
	"luckysheet_alternateformat_save": [], //交替顏色
	"luckysheet_alternateformat_save_modelCustom": [], //自定義交替顏色	
	"freezen": {}, //凍結行列
	"chart": [], //圖表配置
	"visibledatarow": [], //所有行的位置
	"visibledatacolumn": [], //所有列的位置
	"ch_width": 2322, //工作表區域的寬度
	"rh_height": 949, //工作表區域的高度
	"load": "1", //已加載過此sheet的標識
}
```
### 查看方式
在chrome的console中查看
`luckysheet.getluckysheetfile()`
可以看到完整設置
`[{shee1}, {sheet2}, {sheet3}]`

## 快捷鍵

| 快捷鍵 | 功能 |
| ------------ | ------------ |
|  CTRL + C | 覆制單元格 |
|  CTRL + V | 粘貼單元格 |
|  CTRL + X | 剪切單元格 |
|  CTRL + Z | 撤銷 |
|  CTRL + Y | 重做 |
|  CTRL + A | 全選 |
|  CTRL + B | 加粗 |
|  CTRL + F | 查找 |
|  CTRL + H | 替換 |
|  CTRL + I | 斜體 |
|  CTRL + UP/DOWN/LEFT/RIGHT | 快捷調整單元格選框 |
|  SHIFT + UP/DOWN/LEFT/RIGHT | 調整選區 |
|  CTRL + 鼠標左擊 | 多選單元格 |
|  SHIFT + 鼠標左擊 | 調整選區 |
|  UP/DOWN/LEFT/RIGHT | 移動單元格選框 |
|  ENTER | 編輯單元格 |
|  TAB | 向右移動單元格選框 |
|  DELETE | 清除單元格數據 |

## 指引

如果您使用Luckysheet遇到了問題，按以下步驟來尋找答案

1. 使用多吉或者Google搜索常見技術問題
2. Luckysheet相關的問題優先查看[Luckysheet官方文檔](https://mengshukeji.github.io/LuckysheetDocs/zh/)（注意標注TODO的功能暫未實現）
3. 搜索[常見問題列表](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/FAQ.html)
4. 搜索[官方論壇](https://support.qq.com/product/288322)，看看有沒有人已經遇到過
5. 嘗試自己檢查或試驗以找到答案
6. 請嘗試閱讀源代碼以找到答案，

如果以上方法都沒有解決您的問題，可以考慮：

- 去[官方論壇](https://support.qq.com/product/288322)提問
- 去Luckysheet官方微信群或者QQ群提問
- 發現有明顯問題的或者需求無法滿足的，直接提交[issues](https://github.com/mengshukeji/Luckysheet/issues)

> 推薦閱讀 [提問的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/master/README-zh_CN.md)

同時，我們強烈推薦您幫助我們豐富Luckysheet社區

- 如果您發現文檔或者代碼有問題，您可以通過提交PR來貢獻。所有合理的改動、優化、修正，或者文檔的修正、更新相關的提交都會被接受
- 當您有了一部分使用或者二次開發Luckysheet的經驗，我們鼓勵您通過博文分享出來