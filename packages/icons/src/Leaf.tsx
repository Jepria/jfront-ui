import React from "react"

export const LeafImage = (props: React.HTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      {...props}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfZJREFUeNqMks9qE1EUxr87f9KYzMxGAuZPawUpdNM+goWKXfUZunfnSjeCPoNQCoK4cukDCC0Fcd1VFyWl6CYxSQmZNslMmpl7PeekSZVMipeEM3PnfN/5nXOvMsaA19a7o10KFdy/DgFzDtIcv38uG87dN1P79OrZfjRKkGqNNDXQmsxvC9R/tXFw+PMlPSp+naqsO72xR+ME4TBGrx+jezVEuztA87KPRuca1/0hvrze3qe8HcpeyzRQSsGiHcex4Lo2cjkLtm2B9zvdHj5//Y4Xa0sf1KDzdir7uwWb4U7P6+Sl4RU8DIYRViuPcXMDbKw/Bc+rUvLx7Sw6mTcw2qFCWKnVpHc2CfxASHixSZrqWW6GgXEUITRaTaneC0Mx0SRKEo18voA+zaFc2pTcLAJXCKpVIQh8f0ai6UTYhIksS0luZgs8g2a7RaipiL0ikfRC+J4nJDwTe7m8qAUiIIflakXELBASz/9nJnwqiwhcJmi0WlS5iDC8EhKmYIMoipFzKUWVFhkYl69YrVyW4wq8idBfylOE7PE7z4lzFxAomsFv8A32CkXEoxjBoyoNjsWTS8ZtZhIoPS6y+frqE6lmDGaRCaYmTMC58wRJ/NChEg8cF2bS0m3kn5lE+uccW3LnDdLxxd6bjz/wX0tdTJ/+CDAAvAwbAuAg6okAAAAASUVORK5CYII="
    />
  )
}
