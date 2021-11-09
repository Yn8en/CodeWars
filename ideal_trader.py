import time

def ideal_trader(prices, runs):
    start_time = time.time()
    count = 0
    for int in range(runs):
        count+=1
        profit = 1
        for i in range(len(prices)-1):
            if prices[i] < prices[i+1]:
                profit *= (prices[i+1] / prices[i])
    print("--- %s seconds ---" % (time.time() - start_time))
    return str(profit)+", looped x"+str(count)


runs = 1000000
print(ideal_trader([1,2,3,4,5,6,3,2,1,5,2,7,12,4], runs))