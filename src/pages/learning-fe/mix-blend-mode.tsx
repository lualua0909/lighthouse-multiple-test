"use client";

import { useState } from "react";

// Danh sách các blend modes
const blendModes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

// Mô tả cho từng blend mode
const blendModeDescriptions: Record<string, string> = {
  normal: "Hiển thị layer trên mà không blend với layer dưới",
  multiply: "Nhân màu của layer trên với layer dưới, tạo hiệu ứng tối hơn",
  screen: "Ngược với multiply, tạo hiệu ứng sáng hơn",
  overlay: "Kết hợp multiply và screen, tăng contrast",
  darken: "Giữ lại màu tối hơn giữa layer trên và dưới",
  lighten: "Giữ lại màu sáng hơn giữa layer trên và dưới",
  "color-dodge": "Làm sáng layer dưới dựa trên layer trên",
  "color-burn": "Làm tối layer dưới dựa trên layer trên",
  "hard-light": "Kết hợp multiply và screen, tương tự overlay nhưng mạnh hơn",
  "soft-light": "Giống hard-light nhưng nhẹ nhàng hơn",
  difference: "Trừ màu tối hơn từ màu sáng hơn",
  exclusion: "Tương tự difference nhưng contrast thấp hơn",
  hue: "Áp dụng hue của layer trên với saturation và luminosity của layer dưới",
  saturation:
    "Áp dụng saturation của layer trên với hue và luminosity của layer dưới",
  color:
    "Áp dụng hue và saturation của layer trên với luminosity của layer dưới",
  luminosity:
    "Áp dụng luminosity của layer trên với hue và saturation của layer dưới",
};

export default function MixBlendModePage() {
  const [selectedBlendMode, setSelectedBlendMode] = useState("normal");
  const [topColor, setTopColor] = useState("#ff5555");
  const [bottomColor, setBottomColor] = useState("#5555ff");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showRealWorld, setShowRealWorld] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          mix-blend-mode
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Thuộc tính CSS để điều khiển cách màu sắc của một element blend với
          element bên dưới
        </p>

        {/* Main demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left side - controls */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Chọn Blend Mode
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {blendModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedBlendMode(mode)}
                  className={`p-2 rounded text-sm transition-colors ${
                    selectedBlendMode === mode
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Màu sắc</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Layer trên</label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={topColor}
                      onChange={(e) => setTopColor(e.target.value)}
                      className="w-10 h-10 rounded mr-2"
                    />
                    <span className="text-gray-300">{topColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Layer dưới</label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={bottomColor}
                      onChange={(e) => setBottomColor(e.target.value)}
                      className="w-10 h-10 rounded mr-2"
                    />
                    <span className="text-gray-300">{bottomColor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                {selectedBlendMode}
              </h3>
              <p className="text-gray-300">
                {blendModeDescriptions[selectedBlendMode]}
              </p>
            </div>
          </div>

          {/* Right side - visualization */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Kết quả</h2>

            <div className="relative h-64 rounded-lg overflow-hidden border border-gray-700">
              {/* Bottom layer */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: bottomColor,
                }}
              />

              {/* Top layer with blend mode */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: topColor,
                  mixBlendMode: selectedBlendMode as any,
                }}
              />
            </div>

            <div className="mt-6 bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                CSS Code
              </h3>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`.top-layer {
  background-color: ${topColor};
  mix-blend-mode: ${selectedBlendMode};
}

.bottom-layer {
  background-color: ${bottomColor};
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Technical explanation */}
        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            🔍 Giải thích kỹ thuật
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                mix-blend-mode là gì?
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>mix-blend-mode</strong> là thuộc tính CSS xác định
                  cách nội dung của một element sẽ blend (trộn) với nội dung của
                  parent element và background.
                </p>
                <p>
                  Nó hoạt động tương tự như các blend modes trong phần mềm chỉnh
                  sửa ảnh như Photoshop, cho phép tạo ra các hiệu ứng thị giác
                  phức tạp.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                Cách hoạt động
              </h3>
              <div className="text-gray-300 space-y-3">
                <p>
                  Khi áp dụng{" "}
                  <code className="bg-gray-800 px-1 rounded">
                    mix-blend-mode
                  </code>
                  , browser sẽ tính toán màu kết quả cho mỗi pixel dựa trên:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Màu của pixel trong element hiện tại</li>
                  <li>Màu của pixel tương ứng trong layer bên dưới</li>
                  <li>Công thức blend mode được chọn</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">
              Nhóm Blend Modes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Darken Group</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>darken</strong>: Chọn màu tối hơn
                  </li>
                  <li>
                    • <strong>multiply</strong>: Nhân các giá trị màu
                  </li>
                  <li>
                    • <strong>color-burn</strong>: Làm tối và tăng contrast
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Lighten Group</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>lighten</strong>: Chọn màu sáng hơn
                  </li>
                  <li>
                    • <strong>screen</strong>: Ngược với multiply
                  </li>
                  <li>
                    • <strong>color-dodge</strong>: Làm sáng và tăng contrast
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">
                  Contrast Group
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>overlay</strong>: Tăng contrast, giữ highlights và
                    shadows
                  </li>
                  <li>
                    • <strong>soft-light</strong>: Overlay nhẹ nhàng
                  </li>
                  <li>
                    • <strong>hard-light</strong>: Overlay mạnh mẽ
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">
                  Comparative Group
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>difference</strong>: Hiệu giữa hai màu
                  </li>
                  <li>
                    • <strong>exclusion</strong>: Giống difference nhưng nhẹ hơn
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">HSL Group</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>hue</strong>: Áp dụng hue của layer trên
                  </li>
                  <li>
                    • <strong>saturation</strong>: Áp dụng saturation của layer
                    trên
                  </li>
                  <li>
                    • <strong>color</strong>: Áp dụng hue và saturation của
                    layer trên
                  </li>
                  <li>
                    • <strong>luminosity</strong>: Áp dụng luminosity của layer
                    trên
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Special</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>normal</strong>: Không blend
                  </li>
                  <li>
                    • <strong>inherit</strong>: Kế thừa từ parent
                  </li>
                  <li>
                    • <strong>initial</strong>: Giá trị mặc định
                  </li>
                  <li>
                    • <strong>unset</strong>: Xóa giá trị đã set
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced usage */}
        <div className="mb-12">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full bg-gray-800 p-4 rounded-xl mb-4"
          >
            <h2 className="text-2xl font-bold text-white">
              🔧 Sử dụng nâng cao
            </h2>
            <span className="text-blue-400 text-2xl">
              {showAdvanced ? "−" : "+"}
            </span>
          </button>

          {showAdvanced && (
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">
                    Sự khác biệt với background-blend-mode
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-lg mb-6">
                    <div className="text-gray-300 space-y-3">
                      <p>
                        <strong>mix-blend-mode</strong>: Blend element với
                        content bên dưới nó (siblings và parent)
                      </p>
                      <p>
                        <strong>background-blend-mode</strong>: Blend giữa các
                        backgrounds của cùng một element (multiple backgrounds)
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-green-400 mb-4">
                    isolation
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-gray-300 mb-2">
                      Thuộc tính{" "}
                      <code className="bg-gray-800 px-1 rounded">
                        isolation: isolate
                      </code>{" "}
                      tạo stacking context mới, giới hạn phạm vi blend:
                    </p>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      {`.parent {
  isolation: isolate; /* Giới hạn blend trong parent */
}

.child {
  mix-blend-mode: multiply; /* Chỉ blend trong parent */
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">
                    GPU Acceleration
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-lg mb-6">
                    <div className="text-gray-300 space-y-3">
                      <p>
                        <strong>mix-blend-mode</strong> tạo composite layer mới,
                        kích hoạt GPU acceleration.
                      </p>
                      <p>
                        Điều này giúp hiệu suất tốt hơn cho animations nhưng
                        cũng tiêu tốn GPU memory.
                      </p>
                      <p>
                        <strong>Best practice</strong>: Chỉ sử dụng khi cần
                        thiết, đặc biệt trên mobile.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                    Browser Support
                  </h3>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <ul className="text-gray-300 space-y-1">
                      <li>• Chrome: 41+</li>
                      <li>• Firefox: 32+</li>
                      <li>• Safari: 8+</li>
                      <li>• Edge: 79+</li>
                      <li>• IE: Không hỗ trợ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real-world examples */}
        <div className="mb-12">
          <button
            onClick={() => setShowRealWorld(!showRealWorld)}
            className="flex items-center justify-between w-full bg-gray-800 p-4 rounded-xl mb-4"
          >
            <h2 className="text-2xl font-bold text-white">🎨 Ví dụ thực tế</h2>
            <span className="text-blue-400 text-2xl">
              {showRealWorld ? "−" : "+"}
            </span>
          </button>

          {showRealWorld && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example 1: Text over image */}
              <div className="bg-gray-800 p-4 rounded-xl overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Text trên hình ảnh
                </h3>
                <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/placeholder.svg?height=300&width=400')",
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ mixBlendMode: "difference" }}
                  >
                    <span className="text-white text-3xl font-bold">
                      BLEND TEXT
                    </span>
                  </div>
                </div>
                <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                  {`.text {
  mix-blend-mode: difference;
}`}
                </pre>
              </div>

              {/* Example 2: Color overlay */}
              <div className="bg-gray-800 p-4 rounded-xl overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Color overlay
                </h3>
                <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/placeholder.svg?height=300&width=400')",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-blue-500"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                  {`.overlay {
  background-color: blue;
  mix-blend-mode: multiply;
}`}
                </pre>
              </div>

              {/* Example 3: Duotone effect */}
              <div className="bg-gray-800 p-4 rounded-xl overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Duotone effect
                </h3>
                <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/placeholder.svg?height=300&width=400')",
                      filter: "grayscale(100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-yellow-500"
                    style={{ mixBlendMode: "color" }}
                  />
                </div>
                <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                  {`.image {
  filter: grayscale(100%);
}
.gradient {
  background: linear-gradient(...);
  mix-blend-mode: color;
}`}
                </pre>
              </div>

              {/* Example 4: Glowing text */}
              <div className="bg-gray-800 p-4 rounded-xl overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Glowing text
                </h3>
                <div className="relative h-48 rounded-lg overflow-hidden mb-3 bg-black flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">GLOW</div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ mixBlendMode: "screen" }}
                  >
                    <div className="text-blue-500 text-4xl font-bold blur-md">
                      GLOW
                    </div>
                  </div>
                </div>
                <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                  {`.glow-effect {
  color: blue;
  filter: blur(8px);
  mix-blend-mode: screen;
}`}
                </pre>
              </div>

              {/* Example 5: Texture overlay */}
              <div className="bg-gray-800 p-4 rounded-xl overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Texture overlay
                </h3>
                <div className="relative h-48 rounded-lg overflow-hidden mb-3 bg-gradient-to-r from-blue-500 to-purple-500">
                  <div
                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')]"
                    style={{ mixBlendMode: "soft-light", opacity: 0.5 }}
                  />
                </div>
                <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                  {`.texture {
  background-image: url(texture.png);
  mix-blend-mode: soft-light;
  opacity: 0.5;
}`}
                </pre>
              </div>

              {/* Example 6: Invert colors */}
              <div className="bg-gray-800 p-4 rounded-xl overflow-hidden">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Invert colors
                </h3>
                <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/placeholder.svg?height=300&width=400')",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-white"
                    style={{ mixBlendMode: "difference" }}
                  />
                </div>
                <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                  {`.invert {
  background-color: white;
  mix-blend-mode: difference;
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Best practices */}
        <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">
            💡 Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">
                Nên làm:
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Sử dụng cho hiệu ứng thị giác và artistic effects</li>
                <li>• Kết hợp với filter để tạo hiệu ứng phức tạp</li>
                <li>• Sử dụng isolation để kiểm soát phạm vi blend</li>
                <li>• Test trên nhiều trình duyệt</li>
                <li>• Cân nhắc fallback cho trình duyệt cũ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                Không nên làm:
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Sử dụng quá nhiều blend modes cùng lúc</li>
                <li>
                  • Áp dụng cho text quan trọng (có thể ảnh hưởng đến
                  readability)
                </li>
                <li>• Quên kiểm tra contrast và accessibility</li>
                <li>• Sử dụng cho UI elements quan trọng</li>
                <li>• Lạm dụng trên mobile (hiệu suất kém)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
