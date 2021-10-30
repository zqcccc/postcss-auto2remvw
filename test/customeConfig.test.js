const postcss = require('postcss')
const { join } = require('path')

const plugin = require('..')

it("custom config's reg is not a regexp", async () => {
  let result = await postcss([
    plugin({
      customConfigs: [
        {
          reg: "test",
        },
      ],
    }),
  ]).process(`.demo {}`, { from: undefined })
  expect(result.css).toEqual(`.demo {}`)
  expect(result.warnings()).toHaveLength(1)
})

it('different path use different config', async () => {
  let p = postcss([plugin({
    customConfigs: [
      {
        reg: new RegExp('tiny-app/custom-path', 'g'),
        config: {
          baseSize: {
            rem: 375, vw: 3.75
          }
        }
      }
    ]
  })])
  async function run (input, output, path = 'normal', warningNum = 0) {
    let result = await p.process(input, { from: join(__dirname, path) })
    expect(result.css).toEqual(output)
    expect(result.warnings()).toHaveLength(warningNum)
  }
  await run(`
  .demo {
    font-size: 14px;
  }
  `, `
  .demo {
    font-size: 0.018667rem;
  }
  `)
  await run(`
  .demo {
    font-size: 14px;
  }
  `, `
  .demo {
    font-size: 0.037333rem;
  }
  `, 'tiny-app/custom-path/index')
  await run(`
  .demo {
    font-size: 14px;
  }
  `, `
  .demo {
    font-size: 0.018667rem;
  }
  `)
})
