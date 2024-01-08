import {capitalCase} from "change-case"

export class TextUtil {
  constructor(private txt: string) {}
  get() {
    return this.txt;
  }
  splitBy(splitter: string) {
    return this.txt.split(splitter);
  }
  toCamel() {
    this.txt = capitalCase(this.txt)
    return this.txt;
  }
  replace(reg: RegExp, to: string = "") {
    this.txt = this.txt.replace(reg, to);
    return this;
  }
  replaceSuffix(suffix: string, to: string = "") {
    this.txt = this.txt.replace(new RegExp(`${suffix}/$`, to));
    return this;
  }
  replacePrefix(prefix: string, to = "") {
    this.txt = this.txt.replace(new RegExp(`^${prefix}/`), to);
    return this;
  }
  getTxtBehindLastSlash() {
    this.txt = this.txt.match(/[^/]+$/, "")[0];
    return this;
  }
}
