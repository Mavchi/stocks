def count(n: int, deposit: float, interest: float):
    sum = 0
    for y in range(n):
        sum += deposit*(interest**y)
    return sum

years = 10
depositYearly = 6000
averageReturn = 1.5
print(count(10, depositYearly, averageReturn))
print(depositYearly*years)
