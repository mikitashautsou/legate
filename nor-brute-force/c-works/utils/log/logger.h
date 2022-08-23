#ifndef LOGGER
#define LOGGER
// TODO: enable only for debugging

#define LogStream(name) \
    FILE *logger_##name_stream_file;

#define init_log_stream(name, filename) \
    logger_##name_stream_file = fopen(filename, "w+");

#define log(stream_name, ...) ({              \
    fprintf(logger_##name_stream_file, __VA_ARGS__); \
})

#endif