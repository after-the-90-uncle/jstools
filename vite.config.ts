import { defineConfig } from 'vite';
import * as glob from "glob";
import tsconfigPaths from 'vite-plugin-tsconfig-paths';
const files = glob.sync(`./src/**/*.ts`);
console.log(files)
function entries(files){
  const ret={};
  files.forEach((val) => {
    const name = val.slice((`src/`).length, 0 - '.ts'.length);
    if(!name.endsWith(".d")){
      ret[name]= val
    }
    
  });
  return ret;
}

console.log(entries(files))
export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ['umd', 'es',"iife"], // 输出格式，这里包括 'umd' 和 'es'
      name: "JSTools", // 输出文件
    },
    rollupOptions: {
      external: ['some-external-module'], // 如果有外部依赖
    }
  }
});

