# Cities Road Editor MVP

Vue3 + TypeScript + Three.js 的游戏化道路建造编辑器 MVP，交互目标接近《Cities: Skylines》的道路工具，而不是 CAD polygon 编辑器。

## 已实现 MVP 能力

- Three.js 三维场景、网格地面、轨道相机
- 道路类型选择、直线 / 曲线模式、升级 / 删除模式
- 鼠标移动实时道路预览：道路面、中心线、车道线、长度、坡度、曲率、原因提示
- 节点吸附、道路中段吸附、穿越道路自动求交
- 建造提交时自动切分 RoadSegment，更新 RoadNode / RoadSegment 拓扑
- 自动生成 T 字 / 十字 / 多岔路口面
- 自动生成车道线、人行横道、停止线、方向箭头
- 道路升级、删除、撤销重做
- RoadNetwork JSON 导入 / 导出
- Demo 数据

## 运行

```bash
npm install
npm run dev
```

## 操作

1. 左侧选择道路类型。
2. 选择直线或曲线模式。
3. 在地面点击起点，移动鼠标查看预览，再点击终点提交。
4. 靠近端点会吸附连接，落到道路中段会切分并生成 T 字路口，穿越道路会自动生成十字路口。
5. 删除 / 升级模式下 hover 道路后点击生效。
6. Ctrl+Z / Ctrl+Y 撤销重做。
