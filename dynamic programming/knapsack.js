//knapsack with dynamic programming
function knapsack(values, weights, capacity) {
    values.unshift(0);
    weights.unshift(0);

    let dp = new Array(values.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(capacity + 1);
        dp[i][0] = 0;
    }

    for (let j = 0; j <= capacity; j++) {
        dp[0][j] = 0;
    }
    
    for (let i = 1; i < weights.length; i++) {
        let w = weights[i];
        let v = values[i];
        for (let c = 1; c <= capacity; c++) {
            if (w <= c) {
                let remain = c - w;
                dp[i][c] = Math.max(values[i] + dp[i - 1][remain], dp[i - 1][c]);
            }
            else {
                dp[i][c] = dp[i - 1][c];
            }
        }
    }

    return dp[weights.length-1][capacity];
}

//unbound knapsack with dynamic programming
function unboundedKnapsack(values, weights, capacity) {
    values.unshift(0);
    weights.unshift(0);

    let dp = new Array(capacity + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = 0;
    }

    for (let i = 0; i < weights.length; i++) {
        let w = weights[i];
        let v = values[i];
        for (let c = w; c <= capacity; c++) {
            if (w <= c) {
                let remain = c - w;
                dp[c] = Math.max(v + dp[remain], dp[c]);
            }
        }    
    }

    return dp[capacity];
}
