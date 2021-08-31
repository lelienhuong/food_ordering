export const routes = [
    {
        path: '/fruitsAndVegetables',
        meta: { title: 'Fruits & Vegetables', icon: <i class="bi bi-egg"></i> },
        children: [
            {
                path: '/fruits',
                meta: { title: 'Fruits', icon: <i class="bi bi-egg-fried"></i> }
            },
            {
                path: '/vegetables',
                meta: { title: 'Fruits', icon: <i class="bi bi-egg-fried"></i> }
            }
        ]
    },
    {
        path: '/meatAndFish',
        meta: { title: 'Meat & Fish', icon: <i class="bi bi-egg"></i> },
        children: [
            {
                path: '/meat',
                meta: { title: 'Fruits', icon: <i class="bi bi-egg-fried"></i> }
            },
            {
                path: '/fish',
                meta: { title: 'Fruits', icon: <i class="bi bi-egg-fried"></i> }
            }
        ]
    },
    {
        path: '/snacks',
        meta: { title: 'Snacks', icon: <i class="bi bi-egg"></i> },
        children: [
            {
                path: '/biscuits',
                meta: { title: 'Biscuits', icon: <i class="bi bi-egg-fried"></i> }
            },
            {
                path: '/chocolates',
                meta: { title: 'Chocolates', icon: <i class="bi bi-egg-fried"></i> }
            }
        ]
    },
    {
        path: '/cup',
        meta: { title: 'Cup', icon: <i class="bi bi-egg"></i> },
    },

]