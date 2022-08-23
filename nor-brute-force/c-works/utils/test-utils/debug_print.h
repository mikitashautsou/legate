#ifdef DEBUG
#define print(...)           \
    do                       \
    {                        \
        printf(__VA_ARGS__); \
    } while (0)
#define printn(message)        \
    do                         \
    {                          \
        printf(#message "\n"); \
    } while (0)
#else
#define print(...) \
    do             \
    {              \
    } while (0)

#define printn(...) \
    do              \
    {               \
    } while (0)
#endif