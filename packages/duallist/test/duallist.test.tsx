import React from "react"
import { render } from "react-dom"
import { act } from "react-dom/test-utils"
import { DualList } from "../src"

const container = document.createElement("div")
document.body.appendChild(container)

const options = [
  { name: "option1", value: 1 },
  { name: "option2", value: 2 },
  { name: "option3", value: 3 },
  { name: "option4", value: 4 },
  { name: "option5", value: 5 },
  { name: "option6", value: 6 },
]
it("test render", () => {
  act(() => {
    render(<DualList options={options} />, container)
  })
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class=\\"sc-fznyAO jGwDJh\\"><div class=\\"sc-fzozJi jplEaj\\" style=\\"max-width: 45%; margin-bottom: 5px;\\"><input type=\\"text\\" class=\\"sc-fzoLsD gDlcHK\\" value=\\"\\"></div><div class=\\"sc-fznKkj gJLjKO\\"><select multiple=\\"\\" class=\\"sc-fzokOt cqGFjG\\"><option value=\\"1\\" title=\\"option1\\" class=\\"sc-fzqNJr ejZLUg\\">option1</option><option value=\\"2\\" title=\\"option2\\" class=\\"sc-fzqNJr ejZLUg\\">option2</option><option value=\\"3\\" title=\\"option3\\" class=\\"sc-fzqNJr ejZLUg\\">option3</option><option value=\\"4\\" title=\\"option4\\" class=\\"sc-fzqNJr ejZLUg\\">option4</option><option value=\\"5\\" title=\\"option5\\" class=\\"sc-fzqNJr ejZLUg\\">option5</option><option value=\\"6\\" title=\\"option6\\" class=\\"sc-fzqNJr ejZLUg\\">option6</option></select><div class=\\"sc-fznZeY fOvVrq\\"><button type=\\"button\\" class=\\"sc-fzqBZW fCSbcJ\\"><img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAftJREFUeNqkU79rVEEQ/t57u5eEM+YUIpyFRUDbFAt2QkoPrIKCqGBpe3+GZSolHFjoswykEwUtTOtrDGiRAwWRI2e4hPf7195zZs9c7h12tzA7zM7MN/PN7lpVVWGRJTafH8KyLGO01tenDjrbJXVQlqVbFgVsipFLS7M+ReLZs2jh2Rm01kYoUZF06fgJ+7I0rfm2t66xX9UAuFLs+0azPO5cV6S7qCoDkkbR1Jck2mh7npMuS2QUWGQZRqMCjzo3VJHnBiSnLvicJU210YKGeM7nAuRfqxw0GCR42NlQb/a/d3ngWRy7tuNQB+UEgDb19P6miqISfCEXUsH3cxSFRr8f4MHdW+rt/lcDwkPPMg3uSPAWBCVOTrIalZyohHGCOEkIpMDRT407t9vq4+cfPFiM/NAA2DkFSGmj1ZJYW5NYuSQQORrDKseAqv2GwFCu4MpGG+/ef/OKNN3hnH5UgDVT8F72Pvz3kbTvbaljoXHzqsTB3iePWt+xbNsda90dLF+eUCBOz8bjcS2RedJtfBk2mmg1LRy+3jPJstFwaYgm5s/yKhwe4nxVQkdGrfFaFQ5+9VyTLCjZXGOeG180dtCcB9A0rCgIpvbxi1eTZCldtuMwrBVjsBqAf3o6a3r8FxwhTDJ3xY/s3Gf3dqEty7MW/Y0LA/wVYABTAVYT0YK8OQAAAABJRU5ErkJggg==\\" class=\\"sc-fzoXzr bvUUDN\\"></button><button type=\\"button\\" class=\\"sc-fzqBZW fCSbcJ\\"><img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAa9JREFUeNqkU79Lw0AU/lLTqIViHURw6KK4KhwObk4idnDSQbo4ufZPcHR0ESyIIMZJEQdx6OLgJFgHBQUVB7da2mr6K8ldLt5da4y1gtAPXt69y73v/brTfN9HL9DlZ2rzDpqmBZuJkZFgLfazQl0yxkxGKajjKHFtGw8bMy2CTtTe3zEYj3+ZpC0SZufZSDcCGalhWUpLSS+OEaEz8P30vwgkPMbg1Osq3Y8PD+lUklDX/UWiShCNzIbS/CbxPCW2zVAoMKymxsn+yX2m3XgzIBBRyNrKNKnVGOS/r8m01kCl4goSD09PFMsLk+Tw9DYgUQSyo5ZFUSw6QXRXlFBtNNFoNkFFH2QmEs+vfZibTZLcxWPmm0AcMowIEgkDlPt4synKnIPFDPDBKCwRveZwRTAxGsPZ+U1ejHcrXEJ+O5v787IMLc2TQoNjYiiCq+Occo7295vhJq5zzn85yjrFNK5L+gASw8DLwVHL2TDMH1PoBi5qdkRpEnFxSUu7pnLWQ85/EniiafVqNbDLO3st52jU7PoWOmFVKmEzL99Cn66b3c5qvb7GCHrEpwADAFa055IUHoYRAAAAAElFTkSuQmCC\\" class=\\"sc-fzoyAV lgNqAT\\"></button><button type=\\"button\\" class=\\"sc-fzqBZW fCSbcJ\\"><img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAb1JREFUeNqkUz1LI1EUPTPzRoMa0WgiCDYKi4JWz0oQbcVttZCIhR8BQZjScv+AIqtYWqVV7BTBX6BT7PpRhK1iIWIRJ5rMzJsv3xszo5i4Frnw5sKde86997z7pCAI0IwR8Rn5dYGWRAJqa2t4iKqCEJLlvyZ5gVyU/PT4GANF4T+bY28EDSzruq72MWA+PzdMlOsiQZB1HUdbnO2n3EOcarkc+i9H+Ah2GNNW539Qw/Dg2DZ814Xv+//XoDZTCM4tjNJCoYKuLjUk4HbZCMjzde5yJAbbtra+ROnVlVFL8PFzaoiKSxKCRZclvKpKODy9ee9AgDdWJuj1tRFXKBkWivcmqqYJh8/veV4YVxQFvT0dYJb1LqJjWTtbu+f64GAHqn6A2xcbBZuh3NYCluqEl+6B35eGm0nDTKXwQBJgnDjugLeYF/Nu/z7Rppdn6N+ig4GkjH9HZ/pX4kmSpH8WMc9FxNn+sTa8NkeLVYBxUoWQcZ5cf/+yXL8HgsRlbOdmN6+3K6E2sCoV+LX5v9+DiISLdrd3EG+i6Kw9mYTCV/xbgojE4wsk3kIUK5dK6M5k6rVo9jXKaNJeBRgAr5/l039biuYAAAAASUVORK5CYII=\\" class=\\"sc-fzoLag gqDFwP\\"></button><button type=\\"button\\" class=\\"sc-fzqBZW fCSbcJ\\"><img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAglJREFUeNqkU7Fu1EAQnfWufbkcSSCQK6i5io6lAYkiggYh0USIIpaQAAGlPyVCCEFBaE4UaSFtoIMibkBCgiNSCkJBUpx8sc/eXe8yu7YRBrobafzkmZ3nmbdjYoyBWYytvvz5HJGjx0j20AZlUYBGYub7wBgLMXSlyVkbHx46tB/3lFL81tU+t1iWJVgv8rw5G2I8+jN3PB63OvCUlFAUBixaz9MUavoQ36P162d5k8uSxGFrBNtuWRrXdtO+HwShFCK6uzbgSVJWIykFWut/NbBJKetD2CLxPFd8//Z5vr+fw+Iia8h3/y5GDWImcF4pNVjEQEgIiR6sX+B7e9Uok4mGm6vneFVQOT5RXA+2tj9BiwAtenTnEh+NjkHgrJNsCmmWgRDSCWiNUgpB4EN/ZcnVeGI6BaWQAFHm+cbjZztx9zSF+CiBL6mAcWcOyJmTQPvLQFaWQZ1agnS+Cz9E6WpcB1qbio3SoUGhhps70eXwGv9wUAA5wWD0+m38vyXCcVEDdwsAor6FoNMZoojw7sV2NLi3xg8y43KUsYtY0N4BzwPPKvxV+05p67WYQyXExuenr+K5gLq43Q9d69C+RvzaN9IBi24PEOcXFioSFPL7k82oOWxzPcxRXPHGKAxu8KP3u+5Ocf43pl4W2y4q/7FUKsOY3+Tsmnd7vd9nyKx/48wEvwQYAFtvdCIRHiMMAAAAAElFTkSuQmCC\\" class=\\"sc-fzpjYC fNcYWu\\"></button></div><select multiple=\\"\\" class=\\"sc-fzokOt cqGFjG\\"></select></div></div>"`,
  )
})

test("Matches snapshot ", () => {
  act(() => {
    render(
      <DualList
        name="test"
        options={options}
        onSelectionChange={(name, value) => console.log(name, value)}
      />,
      container,
    )
  })
  expect(document.body).toMatchSnapshot()
})
