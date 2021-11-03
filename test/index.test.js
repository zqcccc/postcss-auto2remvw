const postcss = require("postcss")
const { join } = require("path")

const plugin = require("..")

async function easeRun(
  input,
  output,
  opts ,
  { path = "normal", warningNum = 0, warningText = "" } = {}
) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: join(__dirname, path),
  })
  expect(result.css).toEqual(output)
  const warnings = result.warnings()
  expect(warnings).toHaveLength(warningNum)
  if (warningNum) {
    expect(warnings[0].text).toEqual(warningText)
  }
}

it("default force rem", async () => {
  await easeRun(
    `
  .demo {
    font-size: 14px;
  }
  `,
    `
  .demo {
    font-size: 0.018667rem;
  }
  `,
  )
})

it("config force rem", async () => {
  await easeRun(
    `
  .demo {
    font-size: 14px;
  }
  `,
    `
  .demo {
    font-size: 0.018667rem;
    font-size: 1.866667vw;
  }
  `,
    {
      forceRemProps: [],
    }
  )
})

it("keyframes", async () => {
  await easeRun(
    `
  @keyframes jump {
    from {
      width: 2px;
    }
    to {
      width: 10px;
    }
  }
  `,
    `
  @keyframes jump {
    from {
      width: 0.002667rem;
      width: 0.266667vw;
    }
    to {
      width: 0.013333rem;
      width: 1.333333vw;
    }
  }
  `,
    {}
  )
})

it("keepRuleComment", async () => {
  await easeRun(
    `
  .demo {
    /* no-RemVw-next-line */
    width: 100px;
    height: 100px;
  }
  `,
    `
  .demo {
    /* no-RemVw-next-line */
    width: 100px;
    height: 0.133333rem;
    height: 13.333333vw;
  }
  `,
    {}
  )
})

it("keepFileComment", async () => {
  await easeRun(
    `
  /* auto2remvw-disable */
  .demo {
    width: 100px;
    height: 100px;
  }
  `,
    `
  /* auto2remvw-disable */
  .demo {
    width: 100px;
    height: 100px;
  }
  `,
    {}
  )
})

it("media", async () => {
  await easeRun(
    `
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .bottomWrapper {
      height: 144px;
      padding-bottom: 66px;
    }
  }
  `,
    `
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .bottomWrapper {
      height: 0.192rem;
      height: 19.2vw;
      padding-bottom: 0.088rem;
      padding-bottom: 8.8vw;
    }
  }
  `,
    {}
  )
})

it("exclude file", async () => {
  await easeRun(
    `
  .demo {
    font-size: 14px;
  }
  `,
    `
  .demo {
    font-size: 14px;
  }
  `,
    { exclude: /normal/g }
  )
})
it("exclude file is not exist", async () => {
  await easeRun(
    `
  .demo {
    font-size: 14px;
  }
  `,
    `
  .demo {
    font-size: 0.018667rem;
  }
  `,
    { exclude: /normal1/g }
  )
})
it("config.exclude is not reg", async () => {
  await easeRun(
    `
  .demo {
    font-size: 14px;
  }
  `,
    `
  .demo {
    font-size: 0.018667rem;
  }
  `,
    { exclude: "test" },
    {
      warningNum: 1,
      warningText: "exclude should be RegExp",
    }
  )
})

it("no baseSize", async () => {
  await easeRun(
    `.demo { font-size: 14px; }`,
    `.demo { font-size: 14px; }`,
    { baseSize: undefined },
    {
      warningNum: 1,
      warningText: "baseSize should be set",
    }
  )
})
