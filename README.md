# How Jest Mocking Works

I realize that the OP put this up almost 7 years ago, but I was fairly new to Jest and had similar questions, which led
me there. I updated to Jest v29 and followed the trail of errors until getting to a solution.

My solution contains the OP's code with changes and comments, and shows the difference in behaviour between
`jest.mock()` and `jest.doMock()`. Hopefully, this will help someone who comes across this.

# Original Post

This title is a bit misleading. I'm not explaining everything about Jest mocking, just something I wanted to test out
and thought was kind of interesting. So it turns out that if you make a call to `jest.mock` in the root of your module,
that mocking will take place before any require statements are resolved/run. This actually makes Jest's mocking
capabilities really powerful! It essentially means that you can import all the stuff you would normally, and not worry
about whether you're mocking things in time. Pretty legit!

And Christoph [comes in](https://twitter.com/cpojer/status/795729860819820544) to give a little more insight here :)
Looks like you can use `jest.doMock` or `jest.dontMock` to change this behavior.

![tweets](tweets.png)
